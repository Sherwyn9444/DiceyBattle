<script setup>
import { enemies } from '@/Resources/Enemies';
import { Stats } from '@/Resources/Stats';
import { Head, Link } from '@inertiajs/vue3';
import { nextTick, onMounted, ref } from 'vue';
import { markRaw } from 'vue';
import * as MistelImport from '@/Character/Mistel';
import * as UpgradeImport from '@/Character/Upgrade';

const Mistel = { default: MistelImport.default.map(markRaw) };
const Upgrade = { default: UpgradeImport.default.map(markRaw) };

const char_stats = ref({...Stats});
const enemies_list = ref(enemies);
const enemy = ref(null);
const level = ref(0);
const resources = ref({});
const choices = ref([0,0,0]);
const upgrade_choices = ref([0,0,0]);

const character = ref(null);
const cards = shallowRef([]);
const turns = ref(0);
const upgrade_number = ref(0);
const on_upgrade = ref(false);
const on_animation = ref(false);
const show_cards = ref(true);

import { shallowRef } from 'vue';

const card_components_1 = shallowRef(null);
const card_components_2 = shallowRef(null);
const card_components_3 = shallowRef(null);

const upgrade_components_1 = shallowRef(null);
const upgrade_components_2 = shallowRef(null);
const upgrade_components_3 = shallowRef(null);
const enemy_cards = shallowRef(null);

const enemy_died = (enemy)=>{
    
}

const choose_upgrade = async ()=>{
    upgrade_number.value += 1;
    
    if(upgrade_number.value >= 3){
        on_upgrade.value = false;
        upgrade_number.value = 0;
        end_turn();
        return;
    }
    let available = Upgrade.default.length;
    upgrade_choices.value[0] = Math.floor(Math.random() * available);
    upgrade_choices.value[1] = Math.floor(Math.random() * available);
    upgrade_choices.value[2] = Math.floor(Math.random() * available);

    await nextTick();

    if(upgrade_components_1.value) upgrade_components_1.value.start();
    if(upgrade_components_2.value) upgrade_components_2.value.start();
    if(upgrade_components_3.value) upgrade_components_3.value.start();
    
}

const end_turn = async ()=>{

    
    if(enemy.value.health <= 0){
        level.value += 1;
        turns.value = 0;
        enemy.value = enemies_list.value[level.value];      
        upgrade_number.value == 0;
        on_upgrade.value = true;
        on_animation.value = true;
        setTimeout(()=>{
            on_animation.value = false;
        }, 1000);
    }

    if(on_upgrade.value){
        choose_upgrade();
        return;
    }

    
    turns.value += 1;

    await nextTick()

    let available = cards.value;
    choices.value[0] = Math.floor(Math.random() * available.length);
    choices.value[1] = Math.floor(Math.random() * available.length);
    choices.value[2] = Math.floor(Math.random() * available.length);

    await nextTick();

    if(card_components_1.value) card_components_1.value.start();
    if(card_components_2.value) card_components_2.value.start();
    if(card_components_3.value) card_components_3.value.start();

    await nextTick();
    
    if(char_stats.value.health <= (char_stats.value.maxhealth + char_stats.value.healthregen)){
        char_stats.value.health += char_stats.value.healthregen;
        if(char_stats.value.health >= char_stats.value.maxhealth){
            char_stats.value.health = char_stats.value.maxhealth;
        }
    }

    if(char_stats.value.mana <= (char_stats.value.maxmana + char_stats.value.manaregen)){
        char_stats.value.mana += char_stats.value.manaregen;
        if(char_stats.value.mana >= char_stats.value.maxmana){
            char_stats.value.mana = char_stats.value.maxmana;
        }
    }

    if(turns.value <= 1){

        
    }else{
        if(enemy.value.health <= (enemy.value.maxhealth + enemy.value.healthregen)){
            enemy.value.health += enemy.value.healthregen;
            if(enemy.value.health >= enemy.value.maxhealth){
                enemy.value.health = enemy.value.maxhealth;
            }
        }

        if(enemy.value.mana <= (enemy.value.maxmana + enemy.value.manaregen)){
            enemy.value.mana += enemy.value.manaregen;
            if(enemy.value.mana >= enemy.value.maxmana){
                enemy.value.mana = enemy.value.maxmana;
            }
        }

        enemy_cards.value.activate();
    }

}

onMounted(()=>{
    cards.value = [Mistel.default[0], Mistel.default[0], Mistel.default[0]];
    enemy.value = enemies_list.value[level.value];    
    // console.log(enemy.value);
    end_turn();
});

</script>

<template>
    <Head title="Welcome" />
    
    <div class="flex gap-2 justify-between">
        <div class="flex flex-col w-full">
            <div class="text-lg font-bold m-2">Character</div>
            <div class="flex m-2"><img src="/Images/Icons/Health.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.health }} / {{ char_stats.maxhealth }} (+{{ char_stats.healthregen }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Mana.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.mana }} / {{ char_stats.maxmana }} (+{{ char_stats.manaregen }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Attack.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.mindamage }} - {{ char_stats.maxdamage }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Ability.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.ability }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Speed.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.speed }}</div>
        </div>
        <div class="flex flex-col w-full justify-end items-end">
            <div class="text-lg font-bold m-2">{{ enemy?.name }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Health.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.health }} / {{ enemy?.maxhealth }} (+{{ enemy?.healthregen }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Mana.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.mana }} / {{ enemy?.maxmana }} (+{{ enemy?.manaregen }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Attack.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.mindamage }} - {{ enemy?.maxdamage }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Ability.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.ability }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Speed.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.speed }}</div>
        </div>
    </div>

    <div v-if="!on_animation">
        <div class="flex justify-center gap-5 items-center absolute w-screen h-screen left-0 top-0" style="height: calc(100vh - 100px);" v-if="on_upgrade">
            <div class="flex justify-center gap-5  p-5 rounded" style="background-color: lightgreen;">
                <component :is="Upgrade.default[upgrade_choices[0]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" :cards="cards" @end="end_turn" ref="upgrade_components_1"/>
                <component :is="Upgrade.default[upgrade_choices[1]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" :cards="cards" @end="end_turn" ref="upgrade_components_2"/>
                <component :is="Upgrade.default[upgrade_choices[2]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" :cards="cards" @end="end_turn" ref="upgrade_components_3"/>
            </div>
        </div>

        <div class="flex justify-center gap-5 items-center absolute w-screen h-screen left-0 top-0 " style="height: calc(100vh - 100px);" v-if="show_cards && !on_upgrade">
            <div class="flex justify-center gap-5  p-5 rounded" style="background-color: lightblue;">
                <component :is="cards[choices[0]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" @play="end_turn" ref="card_components_1"/>
                <component :is="cards[choices[1]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" @play="end_turn" ref="card_components_2"/>
                <component :is="cards[choices[2]]" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" @play="end_turn" ref="card_components_3"/>
            </div>
        </div>
        
        
        <div class="absolute bottom-0 left-0 m-2">
            <v-card @click="show_cards = !show_cards">
                <v-card-text>Show Cards</v-card-text>
            </v-card>
        </div>

        <div class="absolute bottom-0 right-0 m-2">
            <v-card>
                <v-card-text>Turn : {{ turns }}</v-card-text>
            </v-card>
        </div>

        <component :is="enemy?.pattern" :level="level" :enemy="enemy" :stats="char_stats" :resources="resources" ref="enemy_cards"/>
    </div>

    <transition name="fade">
        <div v-if="on_animation" class="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-50 z-50">  
            <transition
                enter-active-class="transition duration-700 ease-out"
                enter-from-class="opacity-0 scale-50"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-500 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-50"
            >
            <div v-if="on_animation"
                class="bg-white rounded p-5 text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Level {{ level + 1 }}
            </div>
            </transition>
        </div>
    </transition>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>
