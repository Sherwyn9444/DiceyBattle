<script setup>
import Mistel from '@/Character/Mistel';

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");
const card = ref(null);
const emits = defineEmits(['end']);
const activate = () => {
    
    
    emits('end');
}
const start = (place = null)=>{
    let available = Math.floor(Math.random() * Mistel.default.length);
    card.value = Mistel.default[available];
}

defineExpose({start});

</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Upgrade</v-card-title>
        <v-card-subtitle>Card</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Attack</b>
            <p class="text-lg">
                 <span class="flex items-center mx-2 gap-1">
                    Damage enemy for <b>{{ stats.mindamage }} - {{ stats.maxdamage }}</b>
                </span></p>
        </v-card-text>
    </v-card>
</template>