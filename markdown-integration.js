if (Package.markdown) {
  var decode;

  if (Meteor.isClient) {
    decode = function (codeWithEntities) {
      return $('<div/>').html(codeWithEntities).text();
    };
  } else {
    var entities = Npm.require("html-entities").XmlEntities;
    entities = new entities();
    decode = entities.decode;
  }

  var decodeEntitiesAndHighlight = function (codeWithEntities, lang) {
    if (lang) {
      return hljs.highlight(lang, decode(codeWithEntities));
    } else {
      return hljs.highlightAuto(decode(codeWithEntities));
    }
  };

  var oldConstructor = Package.markdown.Showdown.converter;

  Package.markdown.Showdown.converter = function (options) {
    var converter = new oldConstructor(options);
    var oldMakeHtml = converter.makeHtml;

    converter.makeHtml = function (text) {
      text = oldMakeHtml(text);

      text = text.replace(/<pre>\s*<code( class="(.+?)")?>([\s\S]*?)<\/code>\s*<\/pre>/g, function (fullBlock, attr, className, codeOnly) {
        // Don't re-highlight already highlighted code
        if (className && className.match(/hljs/)) {
          return fullBlock;
        }

        var result = decodeEntitiesAndHighlight(codeOnly, className);
        return "<pre><code class='hljs " + result.language + "'>" + result.value + "</code></pre>";
      });

      return text;
    };

    return converter;
  };
}