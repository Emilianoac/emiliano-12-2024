import { ref, onMounted, onUnmounted } from "vue";

export function useInfiniteScroll(loadMore: () => Promise<void>) {
  const isLoading = ref(false);

  const handleScroll = async () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= totalHeight - 10 && !isLoading.value) {
      isLoading.value = true;
      await loadMore();
      isLoading.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isLoading };
}
