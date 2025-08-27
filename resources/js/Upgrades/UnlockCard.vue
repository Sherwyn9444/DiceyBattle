<script setup>
import Mistel from '@/Character/Mistel';
import { onMounted, ref } from 'vue';

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");
const card = ref(null);
const cards = defineModel("cards");
const emits = defineEmits(['end']);

const activate = () => {
    cards.value.push(card.value);
    
    emits('end');
}
const start = (place = null)=>{
    let available = Math.floor(Math.random() * Mistel.length);
    card.value = Mistel[available];
    
}

defineExpose({start});

onMounted(()=>{
    let available = Math.floor(Math.random() * Mistel.length);
    card.value = Mistel[available];
    // let available = Math.floor(Math.random() * Mistel.length);
    // console.log(Mistel[available].__name);
})
</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;" v-if="card">
        <v-card-title>Upgrade</v-card-title>
        <v-card-subtitle>Card</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">{{ card.__name }}</b>
            <p class="text-lg">
                 <span class="flex items-center mx-2 gap-1">
                    Gain the <b>{{ card.__name }}</b> Action.
                </span></p>
        </v-card-text>
    </v-card>
</template>