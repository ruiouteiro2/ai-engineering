import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
export default ts.config({ ignores: ['node_modules/**','.nuxt/**','.output/**','public/**','assets/**','test-results/**','playwright-report/**'] }, js.configs.recommended, ...ts.configs.recommended, ...vue.configs['flat/recommended'], { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: ts.parser } } }, { rules: { 'vue/multi-word-component-names': 'off', '@typescript-eslint/no-explicit-any': 'off', 'no-undef': 'off' } }, prettier)
