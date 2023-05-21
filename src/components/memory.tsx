import { Link } from "expo-router"
import React from "react"
import { View, TouchableOpacity, Text, Image } from "react-native"
import Icon from "@expo/vector-icons/Feather";

export const Memory = () => {
  return (
    <View className="mt-6 space-y-10 ">
      <View className="space-y-4">
        <View className="flex-row items-center gap-2 ">
          <View className="h-px w-5 bg-gray-50" />
          <Text className="font-body text-sm text-gray-200">
            12 de Abril, 2023
          </Text>
        </View>

        <View className="space-y-4 px-8">
          <Image
            className="aspect-video w-full rounded-lg"
            source={{ uri: "https://scontent-for1-1.cdninstagram.com/v/t51.2885-15/323555616_712711780252950_2759304657176078067_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-for1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Tdbc6IIaXSUAX8j3pWR&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAegCISHCa98hYmUcYvBXy4tk0KcDiZ_s3AC6miW2EGZg&oe=647009E3&_nc_sid=8721cf" }}
          />
          <Text className="font-body text-base leading-relaxed text-gray-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus ex purus. Etiam gravida lorem id ex imperdiet, a venenatis ligula pellentesque. Donec enim tortor, mattis non pulvinar ac, mollis a dui. Morbi mollis ex id dignissim venenatis. Fusce sit amet nibh vestibulum, scelerisque neque cursus, efficitur nulla. Sed ultrices id nisi id ornare. Integer lobortis leo sapien, in eleifend mi bibendum sed. Suspendisse a felis felis. Vestibulum semper rutrum tellus. Nam tincidunt felis non ex ultricies vestibulum. In tincidunt, velit a tempor imperdiet, nibh est lacinia erat, quis porttitor velit eros a orci. Donec egestas scelerisque ligula eu posuere.
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
}