<template>
  <NuxtRouteAnnouncer /><NuxtLayout
    ><NuxtPage :page-key="(route) => route.path"
  /></NuxtLayout>
</template>
