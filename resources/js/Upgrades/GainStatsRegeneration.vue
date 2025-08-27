<script setup>

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");

const emits = defineEmits(['end']);
const activate = () => {
    
    stats.value.healthregen += 0.40;
    stats.value.manaregen += 0.15;
    
    emits('end');
}
const start = (place = null)=>{
    
}

defineExpose({start});

</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Upgrade</v-card-title>
        <v-card-subtitle>Stats</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Rejuvenation</b>
            <p class="text-lg"> 
                Gain <b>0.40</b> Health Regen.<br> Gain <b>0.15</b> Mana Regen. 
            </p>
        </v-card-text>
    </v-card>
</template>