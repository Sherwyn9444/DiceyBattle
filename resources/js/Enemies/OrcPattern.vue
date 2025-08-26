<script setup>

const resources = defineModel("resources");
const stats = defineModel("stats");
const enemy = defineModel("enemy");
const level = defineModel("level");
const emits = defineEmits(['Skeleton']);

const activate = () => {
    
    let roll = Math.floor(Math.random() * 1);
    switch(roll){
        case 0:
            attack();
            break;
        case 1:
            break;
        default:
            break;
    }
}

const attack = () => {
    let damage = (Math.floor(Math.random() * enemy.value.maxdamage) + enemy.value.mindamage);
    stats.value.health -= damage;
}

const start = (place = null)=>{
    
}

defineExpose({start, activate});

</script>
<template>
    <div></div>
</template>