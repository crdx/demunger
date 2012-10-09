!function($) {
    $.fn.demunge = function(options) {
        var defaults = {
            encoding: "reverse",
            mailTo: true
        };

        options = $.extend({}, defaults, options);

        return this.each(function() {
            var munged = $(this).text();
            var demunged;

            switch (options.encoding)
            {
                case "reverse":
                    demunged = munged.split("").reverse().join("");
                    break;
                default:
                    demunged = munged;
            }

            if (options.mailTo)
                demunged = $("<a />").attr("href", "mailto:" + demunged).text(demunged);

            $(this).html(demunged);
        });
    }
} (jQuery);
