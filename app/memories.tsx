import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/Feather";
import NlwLogo from "../src/assets/nlw-spacetime-logo.svg";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store"
import { Image } from "react-native";
import { api } from "../src/lib/api";
import { memo, useEffect, useState } from "react";
import { Memory } from "../src/components/memory";


interface Memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

const Memories = () => {
  const [memories, setMemories] = useState<Memory[]>([])
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const onLogout = async () => {
    await SecureStore.deleteItemAsync("token")

    router.push("/")
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync("token")

    const { data = [] } = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setMemories(data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row px-8 items-center justify-between">

        <NlwLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onLogout}
            className="h-10 w-10 justify-center items-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity
              className="h-10 w-10 justify-center items-center rounded-full bg-green-500"
            >
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>


        </View>
      </View>

      {memories.map((memory) => {
        return (
          <View key={memory.id} className="mt-6 space-y-10 ">
            <View className="space-y-4">
              <View className="flex-row items-center gap-2 ">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-sm text-gray-200">
                  {new Date(memory.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  className="aspect-video w-full rounded-lg"
                  source={{ uri: memory.coverUrl }}
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200 pb-0.5">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        )
      })}

    </ScrollView>
  )
}

export default Memories