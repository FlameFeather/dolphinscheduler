/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useI18n } from 'vue-i18n'
import { IEmit } from '../types'
import { updateResource } from '@/service/modules/resources'

export function useRename(state: any) {
  const { t } = useI18n()

  const handleRenameFile = async (
    emit: IEmit,
    hideModal: () => void,
    resetForm: () => void
  ) => {
    await state.renameFormRef.validate()
    if (state.saving) return
    state.saving = true
    try {
      await updateResource(
        {
          ...state.renameForm,
          tenantCode: state.renameForm.user_name,
        }
      )
      window.$message.success(t('resource.file.success'))
      state.saving = false
      emit('updateList')
      hideModal()
      resetForm()
    } catch (err) {
      state.saving = false
    }
  }

  return {
    handleRenameFile
  }
}
