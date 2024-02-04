<template>
  <div class="grid grid-cols-4 gap-0 divide-x divide-y divide-gray-700 text-center text-gray-800 text-[10cqh] min-w-80 h-screen font-bold drop-shadow">
    <div class="col-span-4">
      <input v-model="display" class="bg-gray-200 w-full h-full px-5 tracking-widest">
    </div>
    <div class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-gray-200">
      <button @click="() => clear()" class="w-full h-full">C</button>
    </div>
    <div class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-gray-200">
      <button @click="() => changeSign()" class="w-full h-full">±</button>
    </div>
    <div class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-gray-200">
      <button @click="() => percent()" class="w-full h-full">%</button>
    </div>
    <div class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-100">
      <button @click="pushToQueue('/')" class="w-full h-full">÷</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(7)" class="w-full h-full">7</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(8)" class="w-full h-full">8</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(9)" class="w-full h-full">9</button>
    </div>
    <div class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-100">
      <button @click="pushToQueue('*')" class="w-full h-full">*</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(4)" class="w-full h-full">4</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(5)" class="w-full h-full">5</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(6)" class="w-full h-full">6</button>
    </div>
    <div class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-100">
      <button @click="pushToQueue('-')" class="w-full h-full">-</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(1)" class="w-full h-full">1</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(2)" class="w-full h-full">2</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(3)" class="w-full h-full">3</button>
    </div>
    <div class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-100">
      <button @click="pushToQueue('+')" class="w-full h-full">+</button>
    </div>
    <div class="col-span-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="pushToQueue(0)" class="w-full h-full">0</button>
    </div>
    <div class="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-gray-100">
      <button @click="display = 0" class="w-full h-full">.</button>
    </div>
    <div class="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-amber-100">
      <button @click="() => equal()" class="w-full h-full">=</button>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const display = ref();
const lastNumber = ref();
const lastOperator = ref();
const queue = ref([]);
// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operations = ['+', '-', '/', '*'];

const pushToQueue = (item) => {
  if (! queue.value.length) {
    queue.value.push(item)
    display.value = item
    return;
  }

  const lastItem = queue.value.at(-1)

  if (Number.isInteger(lastItem) && Number.isInteger(item)) {
    queue.value.pop()
    lastNumber.value = parseFloat(`${lastItem}${item}`)
    queue.value.push(lastNumber.value)
    display.value = lastNumber.value
    return;
  }

  if (Number.isInteger(lastItem) && operations.includes(item)) {
    if (queue.value.length >= 3) {
      equal()
    }

    lastOperator.value = item
    queue.value.push(item)
    return;
  }

  if (operations.includes(lastItem) && operations.includes(item)) {
    if (lastItem !== item) {
      queue.value.pop()
      lastOperator.value = item
      queue.value.push(item)
    }
    return;
  }

  if (operations.includes(lastItem) && Number.isInteger(item)) {
    lastNumber.value = parseFloat(item)
    queue.value.push(lastNumber.value)
    display.value = lastNumber.value
    return;
  }
}
const equal = () => {
  if (queue.value.length <= 1) {
    return;
  }

  if (queue.value.length === 2) {
    const result = eval(queue.value.join('')+lastNumber.value);
    queue.value = [result, lastOperator.value]
    display.value = result
    return;
  }

  const result = eval(queue.value.join(''));
  queue.value = [result, lastOperator.value]
  display.value = result
}
const clear = () => {
  display.value = null
  lastNumber.value = null
  lastOperator.value = null
  queue.value = []
}
const changeSign = () => {
  const lastItem = queue.value.at(-1)

  if (Number.isInteger(lastItem)) {
    queue.value.pop()
    queue.value.push(lastItem * -1)
    display.value = queue.value.at(-1)
  }
}
const percent = () => {
  const lastItem = queue.value.at(-1)

  if (Number.isInteger(lastItem)) {
    queue.value.pop()
    queue.value.push(lastItem / 100)
    display.value = queue.value.at(-1)
  }
}
</script>