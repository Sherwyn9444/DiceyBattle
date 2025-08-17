<script setup>
import Hero from '@/Character/Hero.vue';
import Melee from '@/Enemies/Melee.vue';
import { Stats } from '@/Resources/Stats';
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const char_stats = {...Stats};
const cards = [];
const decisions = [];
const zone_component = ref(null);
const char_component = ref(null);
const enemy_component = ref(null);

const get_char_position = ()=>{
    const domEl = char_component.value?.$el || char_component.value;

    if (domEl) {
        const position = domEl.getBoundingClientRect();
        return position;
    }

    return null;
}

const enemy_died = (enemy)=>{
    enemy_component.value.remove();
}

onMounted(()=>{
    enemy_component.value.move_to(get_char_position());
});
</script>

<template>
    <Head title="Welcome" />
    <v-card>
        <div class="flex gap-2 justify-between">
            <div class="flex gap-2 justify-between w-full">
                <div class="flex m-2"><img src="/Images/Icons/Health.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.health }} / {{ char_stats.maxhealth }} (+{{ char_stats.healthregen }})</div>
                <div class="flex m-2"><img src="/Images/Icons/Mana.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.mana }} / {{ char_stats.maxmana }} (+{{ char_stats.manaregen }})</div>
                <div class="flex m-2"><img src="/Images/Icons/Attack.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.mindamage }} - {{ char_stats.maxdamage }}</div>
                <div class="flex m-2"><img src="/Images/Icons/Ability.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.ability }}</div>
                <div class="flex m-2"><img src="/Images/Icons/Speed.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.speed }}</div>
            </div>
            <div class="w-full">
            </div>
        </div>
    </v-card>
    <div class="absolute top-0 flex justify-center items-center h-screen w-screen">
        <div class="w-[750px] h-[750px] bg-green" style="border-radius: 100%;" ref="zone_component">
            <div class="flex justify-center items-center h-full w-full">
                <Hero ref="char_component"></Hero>
            </div>
        </div>
    </div>
    <Melee ref="enemy_component" @died="enemy_died"></Melee>
</template>
