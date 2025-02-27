<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      <span
        v-if="labelHidden"
        class="govuk-visually-hidden"
      >
        {{ label }}
      </span>
      <template v-else>
        {{ label }}
      </template>
    </label>
    <span
      v-if="hint"
      class="govuk-hint"
    >
      {{ hint }}
    </span>
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <input
      :id="id"
      v-model="text"
      class="govuk-input"
      :class="[inputClass, {'govuk-input--error': hasError}]"
      :type="fieldType"
      :max="numMax"
      :autocomplete="autocomplete"
      @change="validate"
    >
  </div>
</template>

<script>
import FormField from '@/components/Form/FormField';
import FormFieldError from '@/components/Form/FormFieldError';

export default {
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    inputClass: {
      default: '',
      type: String,
    },
    numMax: {
      default: null,
      type: Number,
    },
    labelHidden: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    autocomplete() {
      switch (this.type) {
      case 'tel':
      case 'email':
        return this.type;
      default:
        return false;
      }
    },
    fieldType() {
      switch (this.type) {
      case 'text':
      case 'email':
        return 'text'; // we are using custom email validation, so don't use html5 input types
      default:
        return this.type;
      }
    },
  },
};
</script>
