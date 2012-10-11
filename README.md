# demunger

**demunger** is a [jQuery](http://jquery.com) plugin that transparently *demunges* [common email address munging techniques](http://en.wikipedia.org/wiki/Address_munging#Examples).

[*Munging*](http://en.wikipedia.org/wiki/Address_munging) is the practice of disguising an email address to prevent it from being automatically collected and sent spam. The problem with this technique is that, while it's effective, it makes it inconvenient for someone to get the actual email address without having to manually revert what was done to it to disguise it. As you might imagine, that can be annoying.

This plugin transparently automates that process so to the end user it appears as though it hasn't even been disguised. The advantage of doing this with JavaScript is that if for whatever reason scripting is not available then the disguised address will appear in the page as-is and it can still be reverted manually.

## Usage

Include `jquery.demunger.js` in your page.

```html
<script type="text/javascript" src="jquery.demunger.js"></script>
```

Call `demunge([options])` on the elements you want to demunge, passing it any required options. 

#### Example

```html
<span class="email-address">moc.elpmaxe@eno-on</span>

<script type="text/javascript">
    $(".email-address").demunge({ 
        munging: "reverse",
        mailTo: true
    });
</script>
```

## Options

### munging (mixed)

**Default:** `{ type: "traditional", param: "[]" }`

The munging type(s) to apply to the elements.

If the type is one requiring a parameter then it must be passed in as an object with `type` set to the type and `param` set to the parameter. If it doesn't require a parameter then it can be passed in as a string. 

You can also apply multiple types one after another by passing them in an array. For an example see [Using multiple types](#using-multiple-types) below.

### mailTo (boolean)

**Default:** `false`

If `true` then the email address will be converted into a `mailto:` link. 

### clear (string)

**Default:** `""` (i.e. no action)

The selector for the elements whose contents should be cleared after demunging. This is the same string as you would pass to `$()` to select those elements. 

This option is handy if you want to provide instructions for manual demunging in the unlikely case that the user doesn't have scripting enabled and sees the unmodified page.

##### Example

```html
<span class="email-address">no-one@examREMOVEMEple.com</span>
<span class="email-note"> (remove "REMOVEME")</span>

<script type="text/javascript">
    $(".email-address").demunge({ 
        clear: ".email-note",
        munging: { type: "keyword", param: "REMOVEME" }
    });
</script>
```

## Types

### traditional

**Requires Parameter:** yes

This is the most common technique and the default for this plugin. 

Replaces the textual equivalents of `@` and `.` in the email address with the actual characters. (In the default case the textual equivalents would be `[at]` and `[dot]`.)

The parameter is a 2-character string: the first character should appear at the beginning, and the second character should appear at the end. 

**Note**: you should probably _not_ use this one on its own as by now spammers are clever enough to find email addresses disguised like this. If you _really_ want to use it then you should combine it with one of the other techniques.

##### Example

```html
<span class="email-address">no-one(at)example(dot)com</span>

<script type="text/javascript">
    // this is the default so you *could* pass no options to get the same effect
    $(".email-address").demunge({ munging: { type: "traditional", param: "()" } });
</script>
```

### keyword

**Requires Parameter:** yes

Removes a keyword from the email address. 

The parameter is the keyword.

##### Example

```html
<span class="email-address">no-one@examREMOVEMEple.com</span>

<script type="text/javascript">
    $(".email-address").demunge({ munging: { type: "keyword", param: "REMOVEME" } });
</script>
```

### reverse

**Requires Parameter:** no

Reverses the email address.

##### Example

```html
<span class="email-address">moc.elpmaxe@eno-on</span>

<script type="text/javascript">
    $(".email-address").demunge({ munging: "reverse" });
</script>
```

### spaces

**Requires Parameter:** no

Removes all spaces from the email address.

##### Example

```html
<span class="email-address">n o - o n e @ e x a m p l e . c o m</span>

<script type="text/javascript">
    $(".email-address").demunge({ munging: "spaces" });
</script>
```

## Using multiple types

If you supply more than one type in an array then they will be applied one after another. The order is important, so make sure it's correct.

Here's a contrived example.

```html
<span class="email-address">m o c (dot) e l pREMOVEME m a x e (at) o m e d</span>
<span class="email-note"> (good luck with this one)</span>

<script type="text/javascript">
    $(".email-address").demunge({ 
        mailTo: true,
        clear: ".email-note",
        munging: [{ type: "traditional", param: "()" },
                  { type: "keyword", param: "REMOVEME" },
                  "spaces",
                  "reverse"]
    });
</script>
```

## Licence

[MIT](https://github.com/crdx/demunger/blob/master/LICENCE.md).

## Bugs or contributions

Open an [issue](http://github.com/crdx/demunger/issues) or send a [pull request](http://github.com/crdx/demunger/pulls).