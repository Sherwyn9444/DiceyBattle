<script setup>

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");
const animation = defineModel("animation");
const duration = defineModel("duration");
const emits = defineEmits(['play']);
const activate = () => {
    let damage = ((Math.random() * (stats.value.maxdamage + stats.value.mindamage)));
    animation.value = "/Images/Animations/Mistel/purple_slash_1.gif";
    duration.value = 0.8;
    enemy.value.health -= damage;
    
    stats.value.buffs.forEach(buff => {
        if(buff.type == 'attack'){
            buff.duration -= 1;
            if(buff.duration <= 0){
                stats.value.buffs = stats.value.buffs.filter(b => b !== buff);
            }else{
                buff.effect(stats.value, enemy.value);
            }
        }
    });

    stats.value.debuffs.forEach(debuff => {
        if(debuff.type == 'attack'){
            debuff.duration -= 1;
            if(debuff.duration <= 0){
                stats.value.debuffs = stats.value.debuffs.filter(b => b !== debuff);
            }else{
                debuff.effect(stats.value, enemy.value);
            }
        }
    });

    emits('play');
}
const start = (place = null)=>{
    
}

const description = ()=>{
    return `Deal ${1} - ${stats.value.maxdamage + stats.value.mindamage} damage to the enemy.`;
}

defineExpose({start, description});

</script>
<template>
    <v-card @click="activate" class="max-h-[400px] max-w-[300px] mx-1" style="height: 50vh; width: 25vw; background-color: aliceblue;">
        <v-card-title>Action</v-card-title>
        <v-card-subtitle>No Cost</v-card-subtitle>
        
        <v-card-text class="text-center items-center flex h-full flex-col gap-5">
            <b class="text-2xl">Swing Attack</b>
            <p class="text-lg">
                 <span class="flex items-center mx-2 gap-1">
                    {{ description() }}
                </span></p>
        </v-card-text>
    </v-card>
</template>