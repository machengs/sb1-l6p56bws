import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function login(email: string, password: string) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError
      
      user.value = data.user
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut()
      user.value = null
    } catch (e) {
      error.value = e.message
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout
  }
})