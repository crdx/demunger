"use strict";

!function($) {
    $.fn.demunge = function(userOptions) {
        var options = {
            munging: "reverse",
            mailTo: false,
            clear: ""
        };

        $.extend(options, userOptions);

        return this.each(function() {
            var munging, demunged,
                needParam = ["keyword", "traditional"],
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
                if ($.inArray(element.type, needParam) >= 0 && !param)
                    return true;

                switch (element.type)
                {
                    case "traditional":
                        if (param.length != 2)
                            break;

                        demunged = demunged.replace(new RegExp(escape(param[0] + "at" + param[1]), "g"), "@");
                        demunged = demunged.replace(new RegExp(escape(param[0] + "dot" + param[1]), "g"), ".");

                        break;
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

            if (options.clear)
                $(options.clear).empty();

            $(this).html(demunged);
        });
    }

    // escape arbitrary text so it's suitable for a regexp search/replace
    var escape = function(str) {
        return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
} (jQuery);
