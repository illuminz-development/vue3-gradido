<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input :type="type" class="form-control" :name="name" :id="id" :value="value" :placeholder="placeholder"
        @input="$emit('update:value', $event.target.value)" />
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "argon-input",
  emits: ['update:value'],
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    value: String,
    placeholder: String,
    type: String
  },
  methods: {
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  }
};
</script>
