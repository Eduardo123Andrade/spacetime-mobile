import { Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native"

import NlwLogo from "../src/assets/nlw-spacetime-logo.svg";
import Icon from "@expo/vector-icons/Feather"

import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from "expo-secure-store"
import { api } from "../src/lib/api";

const NewMemory = () => {
  const { bottom, top } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState<string>()
  const [preview, setPreview] = useState<string>()

  const router = useRouter()

  const openImagePicker = async () => {

    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets) {
        const [firstImage] = result.assets
        setPreview(firstImage.uri)
      }
    } catch (error) {
      console.log({ error })
    }

  }

  const onPress = async () => {
    const token = await SecureStore.getItemAsync("token")

    let coverUrl = ""

    if (preview) {
      const uploadFormData = new FormData()
      uploadFormData.append("file", {
        uri: preview,
        name: "image.jpg",
        type: "image/jpeg"
      } as any)

      const response = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      coverUrl = response?.data.fileUrl
    }

    await api.post("/memories", {
      coverUrl,
      content,
      isPublic,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push("/memories")

  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between">

        <NlwLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity
            className="h-10 w-10 justify-center items-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>

        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#9b79ea" : "#9e9e90"}
            trackColor={{
              false: "#767577",
              true: "#372560"
            }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória publica
          </Text>
        </View>


        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 justify-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ?
            <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
            : (
              <View className="flex-row items-center   gap-2">
                <Icon name="image" color="#FFF" />
                <Text className="font-body text-sm text-gray-200">
                  Adicionar foto ou video de capa
                </Text>

              </View>
            )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          placeholderTextColor="#5654"
          className="p-0 font-body text-sm text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full items-center bg-green-500 px-5 py-3"
          onPress={onPress}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Salvar
          </Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default NewMemory