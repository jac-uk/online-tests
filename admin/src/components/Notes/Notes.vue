<template>
  <div
    class="govuk-!-margin-top-9 notes"
  >
    <div v-if="isList">
      <h2
        class="govuk-heading-l"
      >
        {{ title }}
      </h2>

      <div v-if="notesList.length === 0">
        <p class="govuk-body">
          There are no notes available.
        </p>
      </div>

      <NotesList
        v-else
        :notes="notesList"
      />
    </div>
  </div>
</template>

<script>
import NotesList from '@/components/Notes/NotesList';

const STEPS = {
  list: 'list',
  new: 'new',
  update: 'update',
  delete: 'delete',
};

export default {
  components: {
    NotesList,
  },
  props: {
    candidateId: {
      type: String,
      default: '',
    },
    applicationId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Notes',
    },
  },
  data() {
    return {
      notesAction: null,
      noteSelectedObj: null,
    };
  },
  computed: {
    isList() {
      return this.notesAction === STEPS.list || this.notesAction === null;
    },
    notesList() {
      const localNotes = this.$store.state.notes.records;
      return localNotes || [];
    },
  },
  methods: {
    changeAction(action) {
      this.notesAction = action;
      this.noteSelectedObj = null;
    },
  },
};
</script>
