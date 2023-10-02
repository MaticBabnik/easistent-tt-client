<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDevStore } from '@/stores/dev'
import CollapseComponent from '@/components/CollapseComponent.vue'
import { ref } from 'vue'

const { t } = useI18n()

const dev = useDevStore()

const activeDev = ref('')
const activeSubDev = ref('')
</script>

<template>
  <h1 v-html="t('about.title')"></h1>
  <p v-html="t('about.p1')"></p>
  <p v-html="t('about.p2')"></p>
  <p v-html="t('about.p3')"></p>

  <CollapseComponent v-model:active="activeDev" name="dev">
    <template #header>
      <h1>{{ t('about.dev.title') }}</h1>
    </template>
    <template #default>
      <CollapseComponent v-model:active="activeSubDev" name="frontend">
        <template #header>
          <h2 class="dev-info-header">{{ t('about.dev.frontend') }}</h2>
        </template>
        <pre>{{ dev.frontendInfo }}</pre>
      </CollapseComponent>
      <CollapseComponent v-model:active="activeSubDev" name="api">
        <template #header>
          <h2 class="dev-info-header">{{ t('about.dev.api') }}</h2>
        </template>
        <pre>{{ dev.backendInfo }}</pre>
      </CollapseComponent>
      <CollapseComponent v-model:active="activeSubDev" name="errors">
        <template #header>
          <h2 class="dev-info-header">{{ t('about.dev.errors') }}</h2>
        </template>
        <div class="errors">
          <div class="error" v-for="(e, i) in dev.errors" :key="i">
            <h2>{{ e.when }} - {{ e.what }}</h2>
            <span>{{ e.where }}</span>
          </div>
        </div>
      </CollapseComponent>
    </template>
  </CollapseComponent>
</template>

<style lang="less">
main {
  @apply overflow-y-auto;
  p {
    @apply text-gray-700 dark:text-gray-300;

    a {
      @apply text-blue-500 dark:text-blue-400;
    }
  }

  pre {
    @apply font-mono bg-slate-200 rounded-lg border border-slate-300
     text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 p-4;
  }

  .dev-info-header {
    @apply text-gray-700 dark:text-gray-300 font-semibold text-lg;
  }

  .errors {
    @apply flex flex-col space-y-4;
    .error {
      @apply bg-red-100 dark:bg-red-900 rounded-lg p-4;
      h2 {
        @apply font-bold font-mono text-red-500 dark:text-red-400;
      }
      span {
        @apply text-red-700 font-mono dark:text-red-300;
      }
    }
  }
}
</style>
