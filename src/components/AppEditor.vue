<template>
  <div>
    <editor :init="init" :value="value" @input="$emit('input', $event)" />
  </div>
</template>

<script>
import 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'

import 'tinymce/plugins/anchor'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/link'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'

export default {
  name: 'AppEditor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      init: {
        body_class: 'vue-tiny',
        content_css: '/vue/tinymce/css/style.css',
        content_style: 'body { font-family: Arial; }',
        height: '65vh',
        plugins: ['anchor', 'charmap', 'code', 'link', 'preview', 'table'],
        toolbar:
          'charmap | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | fontselect fontsizeselect | code | anchor link | preview |table',
        language: 'zh_TW',
        language_url: '/vue/tinymce/langs/zh_TW.js',
        skin: 'oxide',
        skin_url: '/vue/tinymce/skins/ui/oxide',
        font_formats:
          'Arial=arial,helvetica,sans-serif;' +
          '微軟正黑體=微軟正黑體;' +
          '新細明體=新細明體,serif;' +
          '標楷體=標楷體,DFKai-sb;' +
          '思源體=Noto Sans TC;' +
          '仿宋體=cwTeXFangSong,serif;' +
          '明體=cwTeXMing, serif;' +
          '圓體=cwTeXYen, sans-serif;' +
          'Andale Mono=andale mono,monospace;' +
          'Arial Black=arial black,sans-serif;' +
          'Book Antiqua=book antiqua,palatino,serif;' +
          'Comic Sans MS=comic sans ms,sans-serif;' +
          'Courier New=courier new,courier,monospace;' +
          'Georgia=georgia,palatino,serif;' +
          'Helvetica=helvetica,arial,sans-serif;' +
          'Impact=impact,sans-serif;' +
          'Symbol=symbol;' +
          'Tahoma=tahoma,arial,helvetica,sans-serif;' +
          'Terminal=terminal,monaco,monospace;' +
          'Times New Roman=times new roman,times,serif;' +
          'Trebuchet MS=trebuchet ms,geneva,sans-serif;' +
          'Verdana=verdana,geneva,sans-serif;' +
          'Webdings=webdings;' +
          'Wingdings=wingdings,zapf dingbats'
      }
    }
  }
}
</script>
