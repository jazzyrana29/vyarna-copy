"use client"

import { useState, type FC } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from "react-native"
import type { UserDetails } from "../store/userStore"

interface UserDetailsModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (details: UserDetails) => void
  isLoading?: boolean
}

const UserDetailsModal: FC<UserDetailsModalProps> = ({ visible, onClose, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "firstName":
        return value.trim() ? "" : "First name is required"
      case "lastName":
        return value.trim() ? "" : "Last name is required"
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? "" : "Please enter a valid email"
      case "street":
        return value.trim() ? "" : "Street address is required"
      case "city":
        return value.trim() ? "" : "City is required"
      case "state":
        return value.trim() ? "" : "State is required"
      case "zip":
        return value.trim() ? "" : "ZIP code is required"
      default:
        return ""
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    let value: string
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      value = formData.address[addressField as keyof typeof formData.address]
    } else {
      value = formData[field as keyof Omit<UserDetails, "address">] as string
    }

    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = () => {
    // Validate all fields
    const fieldsToValidate = [
      "firstName",
      "lastName",
      "email",
      "address.street",
      "address.city",
      "address.state",
      "address.zip",
    ]

    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true
      let value: string
      if (field.startsWith("address.")) {
        const addressField = field.split(".")[1]
        value = formData.address[addressField as keyof typeof formData.address]
      } else {
        value = formData[field as keyof Omit<UserDetails, "address">] as string
      }

      const error = validateField(field, value)
      if (error) newErrors[field] = error
    })

    setTouched(newTouched)
    setErrors(newErrors)

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
    }
  }

  const renderInput = (field: string, placeholder: string, keyboardType: "default" | "email-address" = "default") => {
    let value: string
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      value = formData.address[addressField as keyof typeof formData.address]
    } else {
      value = formData[field as keyof Omit<UserDetails, "address">] as string
    }

    const hasError = touched[field] && errors[field]

    return (
      <View className="mb-4">
        <TextInput
          className={`w-full h-12 bg-white border rounded-lg px-3 ${hasError ? "border-red-500" : "border-gray-300"}`}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleFieldChange(field, text)}
          onBlur={() => handleFieldBlur(field)}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
          editable={!isLoading}
        />
        {hasError && <Text className="text-red-500 text-sm mt-1">{errors[field]}</Text>}
      </View>
    )
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-xl p-6 mx-6 w-full max-w-md max-h-[90%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-primary">Your Details</Text>
            <Pressable onPress={onClose} disabled={isLoading}>
              <Text className="text-2xl text-secondary">×</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-sm text-secondary mb-4">
              We need your details to process your order and apply any available discounts.
            </Text>

            {/* Personal Information */}
            <Text className="text-base font-semibold text-neutralText mb-3">Personal Information</Text>

            <View className="flex-row space-x-2 mb-4">
              <View className="flex-1">{renderInput("firstName", "First Name")}</View>
              <View className="flex-1">{renderInput("lastName", "Last Name")}</View>
            </View>

            {renderInput("email", "Email Address", "email-address")}

            {/* Address */}
            <Text className="text-base font-semibold text-neutralText mb-3 mt-4">Shipping Address</Text>

            {renderInput("address.street", "Street Address")}

            <View className="flex-row space-x-2">
              <View className="flex-1">{renderInput("address.city", "City")}</View>
              <View className="w-20">{renderInput("address.state", "State")}</View>
              <View className="w-24">{renderInput("address.zip", "ZIP")}</View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`w-full py-3 rounded-lg mt-6 ${isLoading ? "bg-gray-400" : "bg-primary"}`}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <View className="flex-row justify-center items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-bold text-center ml-2">Processing...</Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-center text-base">Continue to Products</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default UserDetailsModal
