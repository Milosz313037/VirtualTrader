<template>
    <AppPage :loading="usersAction.counter === 0">
        <template v-slot:header>
            <DashboardHeader />
        </template>

        <AppCard>
            <q-card-section>
                <div class="row q-gutter-x-sm justify-end">
                    <div class="text-right self-center">
                        <q-btn
                            icon="mdi-wallet"
                            :label="$t('change_balance')"
                            :disable="usersAction.isLoading"
                            color="primary"
                            rounded
                            @click="changeBalanceDialog"
                        />
                    </div>
                    <q-space />
                    <div class="text-right self-center">
                        <q-btn
                            icon="mdi-plus"
                            :label="$t('buy')"
                            :disable="usersAction.isLoading"
                            color="green"
                            rounded
                            @click="buyDialog"
                        />
                    </div>
                    <div class="text-right self-center">
                        <q-btn
                            icon="mdi-minus"
                            :label="$t('sell')"
                            :disable="usersAction.isLoading"
                            color="red"
                            rounded
                            @click="sellDialog"
                        />
                    </div>
                </div>

                <q-table
                    class="no-shadow"
                    row-key="id"
                    :rows="usersAction.state.elements"
                    :columns="columns"
                    :loading="!usersAction.isReady"
                    @request="(props) => usersAction.execute(500, props.pagination)"
                    :filter="filter"
                    color="primary"
                    v-model:pagination="pagination"
                    :rows-per-page-options="[5, 10, 20, 50]"
                >
                <template v-slot:body-cell-edit="props">
                        <q-td class="text-right">
                            <q-btn
                                v-if="props.value !== accountStore.state.id"
                                size="10px"
                                round
                                color="secondary"
                                icon="mdi-cog"
                                :to="{ name: 'user', params: { id: props.value } }"
                            />
                        </q-td>
                    </template>
                </q-table>
            </q-card-section>
        </AppCard>
    </AppPage>
</template>

<script setup lang="ts">
import { api, usePromiseState, ResponseError } from '@/common';
import { PaginationResponse, UserProfileResponse } from '@virtual-trader/shared';
import { ref } from 'vue';
import { QTableColumn, QTableProps, useQuasar } from 'quasar';
import BuyDialog from '@/app/components/dialogs/BuyDialog.vue';
import SellDialog from '@/app/components/dialogs/SellDialog.vue';
import ChangeBalanceDialog from '@/app/components/dialogs/ChangeBalanceDialog.vue';
import { useI18n } from 'vue-i18n';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const $q = useQuasar();
const { t } = useI18n();

const pagination = ref<QTableProps['pagination']>({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
    sortBy: 'createdAt',
    descending: false,
});

const filter = ref('');

const columns: QTableColumn<UserProfileResponse>[] = [
    {
        name: 'number_of_coins',
        label: t('number_of_coins'),
        field: 'email',
        align: 'left',
    },
    {
        name: 'exchange',
        label: t('exchange'),
        field: 'email',
        align: 'left',
    },
    {
        name: 'role',
        label: t('coin_name'),
        field: (row) => t(`coin_${row.coin}`),
        align: 'left',
        sortable: true,
    },
    {
        name: 'margin',
        label: t('margin'),
        field: 'email',
        align: 'left',
    },
    {
        name: 'profit_loss',
        label: t('profit_loss'),
        field: 'email',
        align: 'left',
    },
    {
        name: 'createdAt',
        label: t('users_list_created_at'),
        field: (row) =>
            new Date(row.createdAt).toLocaleDateString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
        align: 'left',
        sortable: true,
    },
    {
        name: 'edit',
        label: t('edit'),
        field: 'id',
        align: 'right',
    },
];

const usersAction = usePromiseState<PaginationResponse<UserProfileResponse>, ResponseError>(
    async (paginationPayload: QTableProps['pagination']) => {
        const { page, rowsPerPage, sortBy, descending } = paginationPayload;

        const res = await api.users.getMany({
            page: page,
            take: rowsPerPage,
            sortBy: sortBy,
            descending: descending,
            filter: filter.value,
        });

        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.rowsNumber = res.data.total;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        return res.data;
    }
);

usersAction.execute(500, pagination.value);

function buyDialog(): void {
    $q.dialog({
        component: BuyDialog,
    }).onOk(() => {
        usersAction.execute(500, pagination.value);
    });
}

function sellDialog(): void {
    $q.dialog({
        component: SellDialog,
    }).onOk(() => {
        usersAction.execute(500, pagination.value);
    });
}
function changeBalanceDialog(): void {
    $q.dialog({
        component: ChangeBalanceDialog,
    }).onOk(() => {
        usersAction.execute(500, pagination.value);
    });
}
</script>
