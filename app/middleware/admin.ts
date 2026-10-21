export default defineNuxtRouteMiddleware(async () => {
  try {
    const u = await useRequestFetch()("/api/me");
    if (!["admin", "editor", "support"].includes(u.role))
      throw createError({
        statusCode: 403,
        statusMessage: "Administration access required",
      });
  } catch (e: any) {
    if (e.statusCode === 403) throw e;
    return navigateTo("/account/sign-in?next=/admin");
  }
});
