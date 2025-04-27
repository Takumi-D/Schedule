import eslint from "@eslint/js";
import globals from "globals"; // Импортируем глобальные переменные
import reactPlugin from "eslint-plugin-react"; // Плагин для React
import prettierPlugin from "eslint-plugin-prettier"; // Плагин для Prettier
import eslintPlugin from "@typescript-eslint/eslint-plugin"; // Плагин для TypeScript
import eslintParser from "@typescript-eslint/parser"; // Парсер для TypeScript
import prettierConfig from "eslint-config-prettier"; // Конфигурация Prettier

export default [
  // Базовая конфигурация ESLint
  eslint.configs.recommended,
  {
    rules: {
      "no-useless-catch": "off", // Отключаем глобально для всех файлов
      "no-console": "off", // Отключаем правило no-console
    },
  },
  // Конфигурация для TypeScript и React
  {
    files: ["**/*.ts", "**/*.tsx"], // Применяем только к TS и TSX файлам
    languageOptions: {
      ecmaVersion: 2021, // Указываем версию ECMAScript
      sourceType: "module", // Указываем, что используем модули
      globals: {
        ...globals.browser, // Глобальные переменные для браузера
        ...globals.node, // Глобальные переменные для Node.js
        fetch: "readonly"
      },
      parser: eslintParser, // Используем парсер для TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
        project: "./tsconfig.json", // Указываем путь к tsconfig.json
      },
    },
    plugins: {
      react: reactPlugin, // Подключаем плагин React
      prettier: prettierPlugin, // Подключаем плагин Prettier
      "@typescript-eslint": eslintPlugin, // Подключаем плагин TypeScript
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules,
      "prettier/prettier": "error", // Включаем проверку Prettier
      "react/prop-types": 0, // Отключаем проверку prop-types
      "@typescript-eslint/no-unused-vars": "warn", // Пример правила для TypeScript
      "@typescript-eslint/no-explicit-any": "off", // Пример правила для TypeScript
    },
    ignores: [
      "**/node_modules/**", // Игнорировать всё в node_modules
      "**/public/**", // Игнорировать всё в папке public
      "**/webpack-*.js", // Игнорировать все файлы, начинающиеся с webpack- и заканчивающиеся на .js
    ],
  },
  prettierConfig,
];