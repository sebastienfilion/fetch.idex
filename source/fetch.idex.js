idex.fetch = function(content, options) {
    this.cache = this.cache || {};

    this.templates = this.template || {
        error: '<span>Error</span>',
        loader: '<span>Loading</span>'
    };

    var $loader, $element, configs, slug;

    configs = this.configs || {
        $parent: $('body').eq(0),
        hook: 'after'
    };

    configs.templates = this.templates;

    $.extend(configs, options);

    function parseURL() {
        function handleBefore() {
            if (configs.hasOwnProperty('callback')) {
                if (configs.callback.hasOwnProperty('before')) {
                    configs.callback.before.apply(window, [$element]);
                } else {
                    idex.parse(configs.templates.loader, {
                        callback: function($e) {
                            $loader = $e;
                        }
                    });
                }
            }
        }

        function handleSuccess(data, status, xhr) {
            this.cache[slug] = undefined;

            parseHTML.apply(this, [data]);
        }

        function handleError(xhr, errorType, error) {
            if (configs.hasOwnProperty('callback')) {
                if (configs.callback.hasOwnProperty('error')) {
                    configs.callback.error.apply(window, [$element]);
                } else {
                    parseHTML.apply(this, [configs.templates.error]);
                }
            }
        }

        function handleComplete(xhr, status) {
            if (configs.hasOwnProperty('callback')) {
                if (configs.callback.hasOwnProperty('complete')) {
                    configs.callback.complete.apply(window, [$element]);
                } else {
                    if ($loader) $loader.remove();
                }
            }

        }

        $.ajax({
            type: 'GET',
            url: content,
            context: this,
            beforeSend: handleBefore,
            success: handleSuccess,
            error: handleError,
            complete: handleComplete
        });
    }

    function parseHTML(html) {
        html = html || content;

        // The parent can be set to false, useful for caching
        if (configs.$parent !== false) {
            $element = $(idex.render(html, configs.content || {}));

            if (configs.hook === 'after') {
                configs.$parent.append($element);
            } else if (configs.hook === 'before') {
                configs.$parent.prepend($element);
            }
        }

        if (this.cache.hasOwnProperty(slug) && typeof this.cache[slug] === 'undefined') {
            this.cache[slug] = html;
        }

        if (configs.hasOwnProperty('callback')) {
            if (configs.callback.hasOwnProperty('success')) {
                configs.callback.success.apply(window, [$element]);
            } else {
                if (typeof configs.callback === 'function') configs.callback.apply(window, [$element]);

            }
        }
    }

    if (/<\/\w+>/.test(content) || $element) {
        parseHTML.apply(this);
    } else {
        slug = content.replace(/[\/\.]/g, "");

        if (this.cache.hasOwnProperty(slug)) {
            parseHTML.apply(this, [this.cache[slug]]);
        } else {
            parseURL.apply(this);

        }
    }
};