/** APP **/


(function(idex, window, document, undefined) {

    idex.test = function() {

        idex.fetch('template.html', {
            hook: 'before'
        });

    };


    idex.test();

    return idex;

}(window.idex = window.idex || {}, window, document));