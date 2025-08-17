<script setup>
import { getCenter } from '@/Helper/GetCenter';
import { reactive, ref } from 'vue';

const emits = defineEmits('died');
const health = ref(100);
const maxhealth = ref(100);
const speed = ref(1);
const enemy_component = ref(null);
let targetPosition = [0, 0];

const enemy_style = reactive({
  transform: 'translate(0px, 0px)',
  transition: 'transform 1s linear',
})


const take_damage = (damage)=>{
    health.value -= damage;
    if(health.value <= 0){
        emits('died');
    }
}

const finish_move = (event) => {
    if (event.propertyName !== 'transform') return

    const el = enemy_component.value?.$el || enemy_component.value;
    const matrix = window.getComputedStyle(el).transform

    if (matrix === 'none') return

    // Parse the matrix values
    const match = matrix.match(/matrix.*\((.+)\)/)
    if (!match) return

    const values = match[1].split(', ').map(parseFloat)
    const currentX = values[4]
    const currentY = values[5]

    const [targetX, targetY] = targetPosition

    const isArrived =
    Math.round(currentX) === Math.round(targetX) &&
    Math.round(currentY) === Math.round(targetY)

    if (isArrived) {
        emits('attacks');
        emits('died');    
        console.log('yay');
    }
}

const move_to = (position, duration = 1) => {
    const [x, y] = getCenter(position)
    const el = enemy_component.value?.$el || enemy_component.value;

    if (!el) return

    const rect = el.getBoundingClientRect()
    const offsetX = rect.width / 2
    const offsetY = (rect.height / 2) + 41

    // Adjust to center the enemy
    const finalX = x - offsetX
    const finalY = y - offsetY
    
    enemy_style.transition = `transform ${duration}s linear`
    enemy_style.transform = `translate(${finalX}px, ${finalY}px)`
}

defineExpose({take_damage, move_to});
</script>
<template>
    <div class="w-[25px] h-[25px] bg-red" ref="enemy_component" :style="enemy_style" @transitionend="finish_move"></div>
</template>