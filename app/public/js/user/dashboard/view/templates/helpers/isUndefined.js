define('dashboard/templates/helpers/isUndefined', ['hbs/handlebars'], function ( Handlebars ) {
    function isUndefined (name) {
        if(name === undefined) {
            return "\<Empty\>";
        }
        else {
            return name;
        }
    }
    Handlebars.registerHelper( 'isUndefined', isUndefined );
    return isUndefined;
});
