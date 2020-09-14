<script lang="ts">
  let tasks = [];
  let previewInner = '';

  const addTasks = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      tasks = [...tasks, previewInner];
      // await tick();
      previewInner = '';
    }
  };

  const removeTasks = (e) => {
    const b = tasks.indexOf(e.currentTarget.innerHTML);
    tasks = tasks.splice(b, 1);
  };
</script>

<style lang="scss">
  $munchingOrange: #f1c232;
  $msTake: #e06666;
  $notGray: #f3f3f3;

  @mixin button-clear {
    background: none;
    border: none;
    outline: none;
    &:hover {
      color: $munchingOrange;
    }
  }

  @mixin word-break {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }

  * {
    font-family: 'Ubuntu', sans-serif;
  }

  h1 {
    @include word-break;
    color: $munchingOrange;
    min-height: 0; /* NEW */
    min-width: 0;
  }

  textarea {
    // Prevent resize
    background-color: $notGray;
    resize: none;
    border: none;
    outline: none;
    // Hide scroll
    overflow: hidden;
    font-size: 1rem;
    padding-top: 1rem;
    &::selection {
      color: #fff2cc;
      background: #fff2cc;
    }
    min-height: 0; /* NEW */
    min-width: 0;
  }

  button {
    @include button-clear;
  }
  .task {
  }

  #wrapper {
    max-width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
  // Media queries based off of bootstrap
  // Very small devices, landscape phones
  @media (min-width: 576px) {
  }
  // Medium devices, tablets
  @media (min-width: 768px) {
  }
  // Large devices, desktops
  @media (min-width: 992px) {
  }
  // XXL devices, 1200px and up
  @media (min-width: 1200px) {
  }
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
  rel="stylesheet" />

<div id="wrapper">
  <!-- Some stuff -->
  <h1>&nbsp;{previewInner}</h1>

  <!-- First an input field to add tasks -->
  <textarea on:keydown={addTasks} bind:value={previewInner} />

  <!-- Then buttons with - bound to delete them -->

  {#each tasks as task, i}
    <div class="task">
      <button
        on:click={() => {
          console.log(i);
          tasks.splice(i, 1);
          tasks = tasks;
        }}>&bull;</button><button contenteditable>{task}</button>
    </div>
  {/each}
</div>
