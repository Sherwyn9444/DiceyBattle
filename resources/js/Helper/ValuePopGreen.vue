<script setup>
const value = defineModel('value');
const show = defineModel('show');
const color = defineModel('color');
</script>
<template>
    <transition
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-700 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
    >
        <span
        v-if="show"
        class="mx-2 font-bold"
        :style="'color: ' + color"
        >
        {{value}}
        </span>
    </transition>

</template>