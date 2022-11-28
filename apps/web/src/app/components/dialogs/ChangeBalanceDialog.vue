<template>
    <AppDialog icon="mdi-plus" :title="$t('change_balance')" v-slot="{ ok, cancel }">
        <Form
            @submit="saveAction.execute(500, ok)"
            :validation-schema="userUpdateSelfBalanceSchema"
            :initial-values="form"
        >
            <q-card-section class="scroll" style="max-height: 50vh">
                <div class="row q-col-gutter-md">
                    <VInput
                        class="col-12"
                        name="balance"
                        v-model="form.balance"
                        :disable="saveAction.isLoading"
                        :label="$t('balance')"
                        outlined
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-account" />
                        </template>
                    </VInput>
                </div>
            </q-card-section>

            <q-card-section class="text-center text-negative" v-if="saveError">
                {{ saveError }}
            </q-card-section>

            <q-card-actions>
                <q-space />
                <q-btn
                    color="secondary"
                    icon="mdi-close"
                    :label="$t('cancel')"
                    :disable="saveAction.isLoading"
                    @click="cancel"
                    rounded
                />

                <q-btn
                    color="primary"
                    icon="mdi-check"
                    :label="$t('save')"
                    :loading="saveAction.isLoading"
                    :disable="saveAction.isLoading"
                    type="submit"
                    rounded
                />
            </q-card-actions>
        </Form>
    </AppDialog>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { UserUpdateSelfBalanceDto, userUpdateSelfBalanceSchema } from '@virtual-trader/shared';
import { useI18n } from 'vue-i18n';
import { computed, reactive, ref, watch } from 'vue';
import { api, usePromiseState, ResponseError } from '@/common';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { t } = useI18n();

const form = reactive<UserUpdateSelfBalanceDto>({
    balance: '',
});

const saveAction = usePromiseState<void, ResponseError>(async (ok: () => void) => {
    await api.users.createOne(form);

    $q.notify({
        icon: 'mdi-check',
        color: 'positive',
        message: t('saved_successfully'),
        timeout: 1000,
    });

    ok();
});

const saveError = computed<string>(() => {
    if (saveAction.error && saveAction.error.response.status === 409)
        return t('users_create_change_balance_error');

    if (saveAction.error) return t('users_create_errors_default');

    return undefined;
});

const isUserExistsError = computed<boolean>(() => {
    return saveAction.error && saveAction.error.response.status === 409;
});

watch(form, () => {
    saveAction.error = undefined;
});
</script>
