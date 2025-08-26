<script setup>

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");
const animation = defineModel("animation");
const emits = defineEmits(['play']);
const activate = () => {
    let damage = (Math.floor(Math.random() * stats.value.maxdamage) + stats.value.mindamage);
    
    stats.value.health += (stats.value.ability * 5);
    if(stats.value.health >= stats.value.maxhealth){
        stats.value.health = stats.value.maxhealth;
    }
    
    emits('play');
}
const start = (place = null)=>{
    
}

const description = ()=>{
    return `Heal Self for ${stats.value.ability * 5}.`;
}

defineExpose({start});

</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Action</v-card-title>
        <v-card-subtitle>1 Mana</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Heal</b>
            <p class="text-lg">
                 <span class="flex items-center mx-2 gap-1">
                    {{ description() }}
                </span></p>
        </v-card-text>
    </v-card>
</template>