"use strict";

!function($) {
    $.fn.demunge = function(options) {
        var defaults = {
            munging: "reverse",
            mailTo: true
        };

        options = $.extend({}, defaults, options);

        return this.each(function() {
            var munged = $(this).text(), munging, demunged;

            munging = $.map($.makeArray(options.munging), function(element, i) {
                return $.type(element) === "string"
                    ? { type: element, param: "" }
                    : element;
            });

            demunged = munged;

            $.each(munging, function(i, element) {
                switch (element.type)
                {
                    case "reverse":
                        demunged = demunged.split("").reverse().join("");
                        break;
                    case "spaces":
                        demunged = demunged.replace(/ /g, "");
                        break;
                }
            });

            if (options.mailTo)
                demunged = $("<a />").attr("href", "mailto:" + demunged).text(demunged);

            $(this).html(demunged);
        });
    }
} (jQuery);
