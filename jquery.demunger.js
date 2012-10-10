"use strict";

!function($) {
    $.fn.demunge = function(options) {
        var defaults = {
            munging: "reverse",
            mailTo: false,
            clear: ""
        };

        options = $.extend({}, defaults, options);

        return this.each(function() {
            var munging, demunged,
                needParam = [ "keyword" ],
                munged = $(this).text();

            munging = $.map($.makeArray(options.munging), function(element, i) {
                return $.type(element) === "string"
                    ? { type: element, param: "" }
                    : element;
            });

            demunged = munged;

            $.each(munging, function(i, element) {
                var param = element.param || "";

                // check if the parameter exists here so we can just assume it exists below
                if ($.inArray(element.type, needParam) >= 0 && param.length == 0)
                    return true;

                switch (element.type)
                {
                    case "reverse":
                        demunged = demunged.split("").reverse().join("");
                        break;
                    case "spaces":
                        demunged = demunged.replace(/ /g, "");
                        break;
                    case "keyword":
                        demunged = demunged.replace(new RegExp(param, "g"), "");
                        break;
                }
            });

            if (options.mailTo)
                demunged = $("<a />").attr("href", "mailto:" + demunged).text(demunged);

            if ($.type(options.clear) !== "undefined" && options.clear.length > 0)
                $(options.clear).empty();

            $(this).html(demunged);
        });
    }
} (jQuery);
