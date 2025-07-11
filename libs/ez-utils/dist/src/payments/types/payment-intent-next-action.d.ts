export type PaymentIntentNextActionType = 'alipay_handle_redirect' | 'boleto_display_details' | 'card_await_notification' | 'cashapp_handle_redirect_or_display_qr_code' | 'display_bank_transfer_instructions' | 'konbini_display_details' | 'multibanco_display_details' | 'oxxo_display_details' | 'paynow_display_qr_code' | 'pix_display_qr_code' | 'promptpay_display_qr_code' | 'redirect_to_url' | 'swish_handle_redirect_or_display_qr_code' | 'use_stripe_sdk' | 'verify_with_microdeposits' | 'wechat_pay_display_qr_code' | 'wechat_pay_redirect_to_android_app' | 'wechat_pay_redirect_to_ios_app';
export interface PaymentIntentNextActionRedirectToURL {
    url: string;
    return_url: string;
}
export interface PaymentIntentNextActionUseStripeSDK {
    [key: string]: any;
}
export interface PaymentIntentNextActionVerifyWithMicrodeposits {
    arrival_date: number;
    hosted_verification_url: string;
    microdeposit_type: 'amounts' | 'descriptor_code';
}
export interface PaymentIntentNextActionOXXODisplayDetails {
    expires_after: number;
    hosted_voucher_url: string;
    number: string;
}
export interface PaymentIntentNextActionBoletoDisplayDetails {
    expires_at: number;
    hosted_voucher_url: string;
    number: string;
    pdf: string;
}
export interface PaymentIntentNextActionCardAwaitNotification {
    charge_attempt_at: number;
    customer_approval_required: boolean;
}
export interface PaymentIntentNextActionCashAppHandleRedirectOrDisplayQRCode {
    hosted_instructions_url: string;
    mobile_auth_url: string;
    qr_code: {
        expires_at: number;
        image_url_png: string;
        image_url_svg: string;
    };
}
export interface PaymentIntentNextActionDisplayBankTransferInstructions {
    amount_remaining: number;
    currency: string;
    financial_addresses: Array<{
        type: string;
        supported_networks: string[];
        aba?: Record<string, any>;
        iban?: Record<string, any>;
        sort_code?: Record<string, any>;
        spei?: Record<string, any>;
        swift?: Record<string, any>;
        zengin?: Record<string, any>;
    }>;
    hosted_instructions_url: string;
    reference: string;
    type: string;
}
export interface PaymentIntentNextActionKonbiniDisplayDetails {
    expires_at: number;
    hosted_voucher_url: string;
    stores: {
        familymart: {
            confirmation_number: string;
            payment_code: string;
        };
        lawson: {
            confirmation_number: string;
            payment_code: string;
        };
        ministop: {
            confirmation_number: string;
            payment_code: string;
        };
        seicomart: {
            confirmation_number: string;
            payment_code: string;
        };
    };
}
export interface PaymentIntentNextActionMultibancoDisplayDetails {
    entity: string;
    expires_at: number;
    hosted_voucher_url: string;
    reference: string;
}
export interface PaymentIntentNextActionPayNowDisplayQRCode {
    data: string;
    hosted_instructions_url: string;
}
export interface PaymentIntentNextActionPixDisplayQRCode {
    data: string;
    expires_at: number;
    hosted_instructions_url: string;
    image_url_png: string;
    image_url_svg: string;
}
export interface PaymentIntentNextActionPromptPayDisplayQRCode {
    data: string;
    hosted_instructions_url: string;
    image_url_png: string;
    image_url_svg: string;
}
export interface PaymentIntentNextActionSwishHandleRedirectOrDisplayQRCode {
    hosted_instructions_url: string;
    mobile_auth_url: string;
    qr_code: {
        data: string;
        image_url_png: string;
        image_url_svg: string;
    };
}
export interface PaymentIntentNextActionWeChatPayDisplayQRCode {
    data: string;
    hosted_instructions_url: string;
    image_data_url: string;
    image_url_png: string;
    image_url_svg: string;
}
export interface PaymentIntentNextActionWeChatPayRedirectToAndroidApp {
    app_id: string;
    nonce_str: string;
    package: string;
    partner_id: string;
    prepay_id: string;
    sign: string;
    timestamp: string;
}
export interface PaymentIntentNextActionWeChatPayRedirectToIOSApp {
    native_url: string;
}
export interface PaymentIntentNextAction {
    type: PaymentIntentNextActionType;
    redirect_to_url?: PaymentIntentNextActionRedirectToURL;
    use_stripe_sdk?: PaymentIntentNextActionUseStripeSDK;
    verify_with_microdeposits?: PaymentIntentNextActionVerifyWithMicrodeposits;
    oxxo_display_details?: PaymentIntentNextActionOXXODisplayDetails;
    boleto_display_details?: PaymentIntentNextActionBoletoDisplayDetails;
    card_await_notification?: PaymentIntentNextActionCardAwaitNotification;
    cashapp_handle_redirect_or_display_qr_code?: PaymentIntentNextActionCashAppHandleRedirectOrDisplayQRCode;
    display_bank_transfer_instructions?: PaymentIntentNextActionDisplayBankTransferInstructions;
    konbini_display_details?: PaymentIntentNextActionKonbiniDisplayDetails;
    multibanco_display_details?: PaymentIntentNextActionMultibancoDisplayDetails;
    paynow_display_qr_code?: PaymentIntentNextActionPayNowDisplayQRCode;
    pix_display_qr_code?: PaymentIntentNextActionPixDisplayQRCode;
    promptpay_display_qr_code?: PaymentIntentNextActionPromptPayDisplayQRCode;
    swish_handle_redirect_or_display_qr_code?: PaymentIntentNextActionSwishHandleRedirectOrDisplayQRCode;
    wechat_pay_display_qr_code?: PaymentIntentNextActionWeChatPayDisplayQRCode;
    wechat_pay_redirect_to_android_app?: PaymentIntentNextActionWeChatPayRedirectToAndroidApp;
    wechat_pay_redirect_to_ios_app?: PaymentIntentNextActionWeChatPayRedirectToIOSApp;
}
