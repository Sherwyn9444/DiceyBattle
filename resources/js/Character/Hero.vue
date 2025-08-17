<script setup>
import { ref } from 'vue';

const emits = defineEmits('died');
const stats = defineModel("stats");

const take_damage = (damage)=>{
    stats.health.value -= damage;
    if(stats.health.value <= 0){
        emits('died');
    }
}

defineExpose({take_damage});
</script>
<template>
    <div class="w-[25px] h-[25px] bg-red"></div>
</template>