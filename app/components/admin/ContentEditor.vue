<script setup lang="ts">
const props = defineProps<{ record?: any }>(),
  emit = defineEmits(["saved"]);
const form = reactive({
    slug: props.record?.slug || "",
    kind: props.record?.kind || "article",
    title: props.record?.title || "",
    summary: props.record?.summary || "",
    body: props.record?.body || "",
    published: props.record?.published || false,
  }),
  message = ref(""),
  busy = ref(false);
async function save() {
  busy.value = true;
  try {
    await apiRequest(
      props.record
        ? "/api/admin/content/" + props.record.id
        : "/api/admin/content",
      {
        method: props.record ? "PATCH" : "POST",
        body: {
          ...form,
          ...(props.record ? { revision: props.record.revision } : {}),
        },
      },
    );
    message.value = "Content saved.";
    emit("saved");
  } catch (e: any) {
    message.value = e.data?.statusMessage || "Could not save content.";
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <form class="stack" @submit.prevent="save">
    <h2>{{ record ? "Edit content" : "Create content" }}</h2>
    <label
      v-for="key in ['title', 'slug', 'summary'] as const"
      :key="key"
      class="field"
      ><span>{{ key }}</span
      ><input
        v-model="form[key]"
        required
        :maxlength="key === 'summary' ? 500 : 180" /></label
    ><label class="field"
      ><span>Content type</span
      ><select v-model="form.kind">
        <option
          v-for="k in ['article', 'guide', 'help', 'page', 'legal']"
          :key="k"
        >
          {{ k }}
        </option>
      </select></label
    ><label class="field"
      ><span>Body (plain text with ## section headings)</span
      ><textarea
        v-model="form.body"
        required
        maxlength="50000"
        style="min-height: 300px"
      /></label
    ><label class="check"
      ><input v-model="form.published" type="checkbox" /><span
        >Publish this content</span
      ></label
    >
    <p class="small">
      Text is rendered safely. HTML and embedded scripts are never interpreted.
    </p>
    <button class="button" :disabled="busy">Save content</button>
    <p role="status">{{ message }}</p>
  </form>
</template>
