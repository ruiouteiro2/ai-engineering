export default defineNuxtRouteMiddleware(async (to) => {
  try {
    await useRequestFetch()("/api/me");
  } catch {
    return navigateTo("/account/sign-in?next=" + encodeURIComponent(to.path));
  }
});
