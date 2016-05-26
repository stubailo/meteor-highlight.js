Package.describe({
  summary: 'Code highlighting integrated with the markdown package',
  version: '1.2.0',
  name: 'simple:highlight.js',
  git: 'https://github.com/stubailo/meteor-highlight.js'
});

Npm.depends({
  'html-entities': '1.1.1',
  'highlight.js': '9.4.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');

  api.use([
    'ecmascript@0.2.0'
  ]);

  api.use([
    'chuangbo:marked@0.3.5_1',
    'markdown@1.0.2'
  ], ['client', 'server'], {
    weak: true
  });

  api.addFiles('github.css', 'client');
  api.mainModule('index.js');

  api.export('hljs');
});
