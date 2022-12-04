<script setup lang="ts">
import { ref, reactive } from 'vue';

import VueTimePicker from 'vue3-timepicker'

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'


import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
    consecutive: null,
    activity_name: null,
    monitor_id: null,
    start_time: null,
    cultural_right_id: null,
    expertise_id: null,
    activity_date: null,
    final_hour: null,
    nac_id: null
})

const rules = {
    activity_name: { required },
    monitor_id: { required },
    start_time: { required },
    cultural_right_id: { required },
    expertise_id: { required},
    activity_date: { required },
    final_hour: { required },
    nac_id: { required }
}

const v$ = useVuelidate(rules, form)

const data = ref([]);

async function getActivities() {
    const res = await fetch("http://localhost:8000/api/activities/new");
    const json = await res.json();
    data.value = json;
    form.consecutive = 'FP' + json.consecutive
}
getActivities()


async function submit() {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    };

    await fetch( 'http://localhost:8000/api/activities/save', request).catch(error => {
        console.log(error.response.data.errors);
    });

    router.push('/')
}

</script>

<template>
    <div class="bg-gray-100 p-6 min-h-screen">
        <div class="bg-white shadow-xl p-8 rounded-lg">
            <div class="flex justify-between">
                <div>
                    <h1 class="font-bold text-2xl">Formulario</h1>
                </div>
                <div class="text-right">
                    <h6>Consecutivo</h6>
                    <h1 class="font-bold text-2xl">{{ form.consecutive }}</h1>
                </div>
            </div>
            <div class="py-12">
                <form @submit.prevent="submit">
                    <div class="flex space-x-8">
                        <div class="w-1/2 space-y-4">
                            <div>
                                <label for="" class="font-bold mb-2 block">Nombre Actividad *</label>
                                <input v-model="v$.activity_name.$model" type="text" placeholder="Nombre Actividad *" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                <span v-if="v$.activity_name.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo nombre de actividad es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Hora Inicio *</label>
                                <VueTimePicker format="hh:mm a" v-model="v$.start_time.$model"></VueTimePicker>
                                <span v-if="v$.start_time.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo hora inicio es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Derecho Cultural *</label>
                                <select v-model="v$.cultural_right_id.$model" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                    <option :value="cultural_right.id" v-for="(cultural_right, index) in data.cultural_rights" :key="index">{{ cultural_right.name }}</option>
                                </select>
                                <span v-if="v$.cultural_right_id.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo derecho cultural es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Monitor *</label>
                                <select v-model="v$.monitor_id.$model" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                    <option :value="monitor.id" v-for="(monitor, index) in data.monitors" :key="index">{{ monitor.name }}</option>
                                </select>
                                <span v-if="v$.monitor_id.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo monitor es requerido</span>
                            </div>
                        </div>
                        <div class="w-1/2 space-y-4">
                            <div>
                                <label for="" class="font-bold mb-2 block">Experticia *</label>
                                <select v-model="v$.expertise_id.$model" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                    <option :value="expertise.id" v-for="(expertise, index) in data.expertises" :key="index">{{ expertise.name }}</option>
                                </select>
                                <span v-if="v$.expertise_id.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo experticia es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Fecha *</label>
                                <input v-model="v$.activity_date.$model" type="date" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                <span v-if="v$.activity_date.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo fecha es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Hora Final *</label>
                                <VueTimePicker format="hh:mm a" v-model="v$.final_hour.$model"></VueTimePicker>
                                <span v-if="v$.final_hour.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo hora final es requerido</span>
                            </div>
                            <div>
                                <label for="" class="font-bold mb-2 block">Nac *</label>
                                <select v-model="v$.nac_id.$model" class="w-full border border-gray-200 rounded-xl px-4 py-2">
                                    <option :value="nac.id" v-for="(nac, index) in data.nacs" :key="index">{{ nac.name }}</option>
                                </select>
                                <span v-if="v$.nac_id.$error" class="block mt-2 text-xs font-bold text-red-600 italic">El campo nac es requerido</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button class="bg-black hover:bg-gray-600 text-white font-bold px-4 py-3 rounded-xl uppercase font-bold disabled:bg-opacity-25" :disabled="v$.$invalid">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
