<script setup>
import { ref, watch, useSlots } from 'vue';

// Пропсы
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: ''
  },

  closeOnOverlay: {
    type: Boolean,
    default: true
  },
});



// Emits
const emit = defineEmits(['update:modelValue', 'save', 'close']);

const slots = useSlots();

// Данные
const value = ref('');

// Закрытие модалки
const closeModal = () => {
  emit('update:modelValue', false);
  emit('close');
};

// Сохранение: при кастомном контенте (слоте) валидация на стороне родителя,
// для дефолтного инпута не пропускаем пустое значение
const handleSave = () => {
  if (slots.default || value.value.trim()) {
    emit('save', value.value.trim());
    closeModal();
  }
};

// Сброс при закрытии
watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    value.value = '';
  }
});
</script>


<!-- ModalChange.vue -->
<template>
  <Teleport to="body">
    <!-- Оверлей (фон) -->
    <div 
      v-if="modelValue" 
      class="modal-overlay"
      @click="closeOnOverlay && closeModal()"
    >
      <!-- Контент модалки -->
      <div 
        class="modal-content"
        @click.stop
      >
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button 
            class="modal-close-btn"
            @click="closeModal"
          >
            ✕
          </button>
        </div>

        <div class="modal-body">
          <!-- 🔥 СЛОТ — теперь можно вставлять любой контент -->
          <slot>
            <!-- Дефолтный контент (для email) -->
            <div class="input-field">
              <input 
                :type="inputType || 'text'" 
                :placeholder="placeholder || ''"
                v-model="value"
                @keydown.enter="handleSave"
              />
            </div>
          </slot>
        </div>

        <div class="modal-footer">
          <button 
            class="btn-cancel"
            @click="closeModal"
          >
            Cancel
          </button>
          <button 
            class="btn-save"
            @click="handleSave"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Оверлей - занимает весь экран */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

/* Контент модалки */
.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

/* Заголовок */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background: #f0f0f0;
  color: #000;
}

/* Тело */
.modal-body {
  margin-bottom: 24px;
}

.input-field input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.2s;
  outline: none;
}

.input-field input:focus {
  border-color: #6366f1;
}

/* Футер с кнопками */
.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background: #f0f0f0;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-save {
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>