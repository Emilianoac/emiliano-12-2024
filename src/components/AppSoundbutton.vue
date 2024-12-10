<script lang="ts" setup>
import { ref } from "vue";
import IconSound from "@/components/icons/IconSound.vue";

defineProps<{
  soundData: string | undefined;
}>();

const sound = ref<HTMLAudioElement | null>(null);

function playSound() {
  if (!sound.value) return;
  sound.value.volume = 0.4;
  sound.value.play();
}
</script>

<template>
  <div v-if="soundData">
    <audio controls hidden ref="sound">
      <source :src="soundData" type="audio/mpeg">
    </audio>

    <button class="sound-button" @click="playSound" title="Reproducir sonido">
      <IconSound :width="24" :height="24" />
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.sound-button {
  @apply h-9 w-9;
  @apply flex items-center justify-center;
  @apply bg-gray-200 dark:bg-gray-700 rounded-full p-2;

  &:hover {
    @apply bg-gray-300 dark:bg-gray-600;
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>


