<script setup>
import { enemies } from '@/Resources/Enemies';
import { Stats } from '@/Resources/Stats';
import { Head, Link } from '@inertiajs/vue3';
import { nextTick, onMounted, ref } from 'vue';
import { markRaw } from 'vue';
import { watch } from 'vue';
import * as MistelImport from '@/Character/Mistel';
import * as UpgradeImport from '@/Character/Upgrade';

const Mistel = { default: MistelImport.default.map(markRaw) };
const Upgrade = { default: UpgradeImport.default.map(markRaw) };

const char_stats = ref({...Stats});
const enemies_list = ref(enemies);

const enemy = ref(null);
const enemy_popup = ref(false);
const enemy_poptext = ref("");
const enemy_popcolor = ref("green");

const level = ref(0);
const resources = ref({});
const choices = ref([0,0,0]);
const upgrade_choices = ref([0,0,0]);

const character = ref(null);
const char_popup = ref(false);
const char_poptext = ref("");
const char_popcolor = ref("green");
const char_animation = ref(null);
const char_duration = ref(0);

const cards = shallowRef([]);
const turns = ref(0);
const upgrade_number = ref(0);
const on_upgrade = ref(false);
const on_action = ref(false);
const on_animation = ref(false);
const show_cards = ref(true);

import { shallowRef } from 'vue';
import ValuePopGreen from '@/Helper/ValuePopGreen.vue';

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

    on_action.value = false;

    if(upgrade_number.value >= 4){
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

watch(
    () => enemy.value?.health,
    (newVal, oldVal) => {
        if (newVal > oldVal) {
            enemy_poptext.value = "+" +  Number(newVal - oldVal).toFixed(2);
            enemy_popup.value = true;
            enemy_popcolor.value = "green";
            setTimeout(() => {
                enemy_popup.value = false;
            }, 1000);
        }else if(newVal < oldVal){
            enemy_poptext.value = "" +  Number(newVal - oldVal).toFixed(2);
            enemy_popup.value = true;
            enemy_popcolor.value = "red";
            setTimeout(() => {
                enemy_popup.value = false;
            }, 1000);
        }
    }
);


watch(
    () => char_stats.value.health,
    (newVal, oldVal) => {
        if (newVal > oldVal) {
            char_poptext.value = "+" +  Number(newVal - oldVal).toFixed(2);
            char_popup.value = true;
            char_popcolor.value = "green";
            setTimeout(() => {
                char_popup.value = false;
            }, 1000);
        }else if(newVal < oldVal){
            char_poptext.value = "" +  Number(newVal - oldVal).toFixed(2);
            char_popup.value = true;
            char_popcolor.value = "red";
            setTimeout(() => {
                char_popup.value = false;
            }, 1000);
        }
    }
);


const end_turn = async ()=>{
    
    if(char_animation.value){
        on_action.value = true;
        setTimeout(()=>{on_action.value = false;char_animation.value = null;}, char_duration.value * 1000);
    }
    
    if(enemy.value.health <= 0){
        show_cards.value = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
        show_cards.value = true;
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

    
    

    show_cards.value = false;   

    if(turns.value > 1){
        setTimeout(()=>{
            enemy_cards.value.activate(); 
        }, 1000);
               
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    show_cards.value = true;
    
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

    char_stats.value.passives.forEach(passive => {
        if(passive.type == 'end_turn'){
            passive.effect(char_stats.value, enemy.value);
        }
    });

    char_stats.value.buffs.forEach(buff => {
        if(buff.type == 'end_turn'){
            buff.duration -= 1;
            if(buff.duration <= 0){
                buff.end(char_stats.value, enemy.value);
                char_stats.value.buffs = char_stats.value.buffs.filter(b => b !== buff);
            }else{
                buff.effect(char_stats.value, enemy.value);
            }
        }
    });

    char_stats.value.debuffs.forEach(buff => {
        if(buff.type == 'end_turn'){
            buff.duration -= 1;
            if(buff.duration <= 0){
                buff.end(char_stats.value, enemy.value);
                char_stats.value.debuffs = char_stats.value.debuffs.filter(b => b !== buff);
            }else{
                buff.effect(char_stats.value, enemy.value);
            }
        }
    });

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
            <div class="flex m-2">
                <img src="/Images/Icons/Health.png" class="w-[25px] h-[25px] me-1"/>
                {{ Number(char_stats.health).toFixed(2) }} / {{ Number(char_stats.maxhealth).toFixed(2) }} (+{{ Number(char_stats.healthregen).toFixed(2) }})
                <ValuePopGreen v-model:show="char_popup" v-model:value="char_poptext" v-model:color="char_popcolor"/>
            </div>
            <div class="flex m-2"><img src="/Images/Icons/Mana.png" class="w-[25px] h-[25px] me-1"/> {{  Number(char_stats.mana).toFixed(2) }} / {{  Number(char_stats.maxmana).toFixed(2) }} (+{{  Number(char_stats.manaregen).toFixed(2) }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Attack.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.mindamage }} - {{ char_stats.maxdamage }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Ability.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.ability }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Speed.png" class="w-[25px] h-[25px] me-1"/> {{ char_stats.speed }}</div>
        </div>
        <div class="flex flex-col w-full justify-end items-end">
            <div class="text-lg font-bold m-2">{{ enemy?.name }}</div>
            <div class="flex m-2">
                <ValuePopGreen v-model:show="enemy_popup" v-model:value="enemy_poptext" v-model:color="enemy_popcolor"/>
                <img src="/Images/Icons/Health.png" class="w-[25px] h-[25px] me-1"/> 
                {{  Number(enemy?.health).toFixed(2) }} / {{  Number(enemy?.maxhealth).toFixed(2) }} (+{{  Number(enemy?.healthregen).toFixed(2) }})
            </div>
            <div class="flex m-2"><img src="/Images/Icons/Mana.png" class="w-[25px] h-[25px] me-1"/> {{  Number(enemy?.mana).toFixed(2) }} / {{  Number(enemy?.maxmana).toFixed(2) }} (+{{ enemy?.manaregen }})</div>
            <div class="flex m-2"><img src="/Images/Icons/Attack.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.mindamage }} - {{ enemy?.maxdamage }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Ability.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.ability }}</div>
            <div class="flex m-2"><img src="/Images/Icons/Speed.png" class="w-[25px] h-[25px] me-1"/> {{ enemy?.speed }}</div>
        </div>
    </div>

    <div v-if="!on_animation">
        <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-75"
        >
        <div class="flex justify-center gap-5 items-center absolute w-screen h-screen left-0 top-0" style="height: calc(100vh - 100px);" v-if="on_upgrade">
            <div class="flex justify-center gap-5  p-5 rounded" style="background-color: lightgreen;">
                <component :is="Upgrade.default[upgrade_choices[0]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:cards="cards" @end="end_turn" ref="upgrade_components_1"/>
                <component :is="Upgrade.default[upgrade_choices[1]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:cards="cards" @end="end_turn" ref="upgrade_components_2"/>
                <component :is="Upgrade.default[upgrade_choices[2]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:cards="cards" @end="end_turn" ref="upgrade_components_3"/>
            </div>
        </div>
        </transition>

        <div v-if="on_action && char_animation" class="flex justify-center gap-5 items-center absolute w-screen h-screen left-0 top-0" style="height: calc(100vh - 100px);">
            <img :src="char_animation" />
        </div>

        <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-75"
        >
        <div v-if="show_cards && !on_upgrade" class="flex justify-center gap-5 items-center absolute w-screen h-screen left-0 top-0" style="height: calc(100vh - 100px);" >
            <div class="flex justify-center gap-5 p-5 rounded bg-[lightblue] shadow-xl">
                <component :is="cards[choices[0]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:animation="char_animation" v-model:duration="char_duration" @play="end_turn" ref="card_components_1" />
                <component :is="cards[choices[1]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:animation="char_animation" v-model:duration="char_duration" @play="end_turn" ref="card_components_2"/>
                <component :is="cards[choices[2]]" v-model:level="level" v-model:enemy="enemy" v-model:stats="char_stats" v-model:resources="resources" v-model:animation="char_animation" v-model:duration="char_duration" @play="end_turn" ref="card_components_3" />
            </div>
        </div>
        </transition>
        
        
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
