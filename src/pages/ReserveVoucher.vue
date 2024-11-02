<template>

  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
  <q-page class="style" v-if="reserveDetails != null"  id="print">
  <div class="row items-center">
      <div class="row col-9 col-sm-9" >
        <div class="font-extra-bold h2 q-pl-md" > جزئیات رزرو
          <span class="q-pr-sm h4-5 font-en-num-bold"
          @click="copyToClipboardd(reserveDetails.id)" style="cursor: pointer"> {{ reserveDetails.id }}
        <q-icon name="content_copy" size="xs" color="grey" style="font-size: 13px;margin-bottom: 10px;"/></span>
        </div>
        <div class="font-bold h4 q-px-sm">وضعیت رزرو : </div>
        <div class="font-medium h4 text-secondary q-mr-md">
          {{ reserveDetails.statusDesc }}
          <span class="font-regular h5">{{ reserveDetails.bookWithCredit == null ? '' : '('+reserveDetails.bookWithCredit+')'}}
            {{reserveDetails.isEdited ? '(اصلاحیه)':''}}
          </span>
          {{  reserveDetails.isInquiry && reserveDetails.status === 1 ? '(استعلامی)' :'' }}</div>

          <div class="font-bold h4 q-px-sm"> نحوه پرداخت :  </div>
        <div :class="'font-medium h4  ' + (reserveDetails.isPayed != 3 ? 'text-positive' : 'text-negative')"> {{ reserveDetails.isPayedDesc }}</div>
      </div>
      <div class="row col-3 col-sm-3" style="justify-content: left;"
      v-if="panel === 'hotel' || panel === 'admin' || panel==='supplier'">

        <q-btn unelevated flat class="text-left gt-sm"
            round color="primary" icon="o_edit" @click="editVoucher = true">
              <q-tooltip>اعمال تغییرات در ووچر</q-tooltip>
            </q-btn>
            <q-btn unelevated flat class="text-left lt-xsc col-4"
            round color="primary" icon="o_edit" @click="editVoucher = true">
              <q-tooltip>اعمال تغییرات در ووچر</q-tooltip>
            </q-btn>
      </div>
    </div>
    <CardPanel flat :show_deafult_btns="false">
      <template #header-right>
        <div class="row" style="margin-bottom: -20px;"  >
          <div class="col-sm-11 row">
            <div class="col-sm-1 q-mt-sm">
              <q-avatar class="q-mx-md">
              <img :src="hotelDetails.img" :alt="hotelDetails.name">
            </q-avatar>
            </div>
            <div class="lt-sm col-sm-1 " style="text-align: right;margin-right:auto;">


        <q-btn unelevated v-if="reserveDetails.status !== 7 && reserveDetails.status !== 0 && reserveDetails.status !== 2" flat
            dense style="margin-right:auto;" id="lt-printt"
            :size="panel==='admin' ? 'md' : 'lg'"
            round color="primary" icon="print" @click="printDialog = true">
              <q-tooltip>پرینت</q-tooltip>
        </q-btn>
          </div>
            <div class="col-sm-10 q-mt-sm">
              <div class="row">
                <div class="font-demi-bold h3">{{ hotelDetails.name }}</div>
                <q-badge v-if="reserveDetails.providerType !== 0" color="light" text-color="grey"
                label="تامین کننده"
                 rounded class="h5-6 font-demi-bold q-px-sm q-mx-xs"/>
                <q-rating
                  v-model="hotelDetails.stars"
                  :max="hotelDetails.stars"
                  size="1.5em"
                  color="warning"
                  icon="star_border"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                />
              </div>
              <div class="row" >
                <div class="row">
                  <q-icon name="o_location_on" />
                  <div class="font-light h5 ">{{ hotelDetails.address }}</div>
                </div>
                <div class="q-ml-md row">
                  <q-icon name="o_phone"/>
                  <div class="font-light h5 ">{{ hotelDetails.tel }}</div>
                </div>
              </div>
            </div>

          </div>
          <div class="gt-xs col-sm-1 " style="text-align: left;">
            <q-btn unelevated v-if="reserveDetails.status !== 7 && reserveDetails.status !== 0 && reserveDetails.status !== 2" flat
            round color="primary" icon="o_print" @click="printDialog = true"
            style="margin-left: 0;" id="gt-printt">
              <q-tooltip>پرینت</q-tooltip>
            </q-btn>

          </div>

        </div>
      </template>

      <template #body>
        <div class="row justify-center" style="margin-bottom: -10px;">
          <div v-for="i in list" :key="i" class="col-12 col-sm-4">
            <ItemsList :items="i" />
          </div>
        </div>
      </template>

      <template #actions>
        <div id="actions">

        <q-btn unelevated v-if="estelamiBtnCondition()" label="استعلامی" color="light-blue" icon="help"
         class="col-6 style col-sm-3" style="max-width: 200px;"
        :loading="reserveDetails.loading">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup
              @click="onSetEstelamValidation(true)">
                <q-item-section>تایید</q-item-section>
              </q-item>
              <q-item clickable v-close-popup
              @click="onSetEstelamValidation(false)">
                <q-item-section>عدم تایید</q-item-section>
              </q-item>
              <q-item clickable v-close-popup
              @click="onSetEstelamCreationByHotel(false)">
                <q-item-section>لغو</q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-if="reserveDetails.status === 8"
              @click="onSetEstelamCreationByHotel(true)">
                <q-item-section>ثبت</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn unelevated
        v-if="cancelationBtnConditions()" label="کنسلی"
         color="negative"
         icon="disabled_by_default" class="col-6 style col-sm-3" style="max-width: 200px;"
        @click="onOpenCancelation" />


        </div>
      </template>
    </CardPanel>

    <CardPanel :title="reserveDetails.detailReserves.length >1? 'اتاق های رزرو شده:' : 'اتاق رزرو شده:'" flat :hide_actions="true">
      <template #body>
        <div style="margin-top: -20px;">
          <ExpansionList  class="bg-light border-none" dense
          v-for="(item,index) in reserveDetails.detailReserves" :key="index"
           :expand="index==0 ? true : false"
           :text="[
            {
              col: item.roomName,
              row: item.boardTypeDesc,
              class:'regality font-bold',
              class_row:'info-color'
            },
            {
              col: 'نوع فروش',
              row: item.roomReserveTypeDesc ,
              class:'font-demi-bold'
            },
            {
              col: 'شماره رزرو اتاق',
              row: item.id,
              class_row:'font-en-num-light'
            },
            {
              col: 'تعداد مهمان',
              row: item.numberOfGuest+item.numberOfExtraBed+item.numberOfChild
            },
            {
              col: 'وضعیت',
              row:item.statusDesc,
              class_row:isWarranty ? 'text-positive' : 'text-negative'
            }
          ]"
          >
          <template #body>
            <q-card-section class="q-px-md">
              <div class="row q-px-xs">
                <div class="col-12 col-sm-6 col-md-4">
                <items-list :items="[
                {
                  col: 'تخت اضافه',
                  row: item.numberOfExtraBed
                },
                {
                  col: 'سرویس های اضافه',
                  row: item.serviceNames.toString() ? item.serviceNames.toString() : '__'
                }
              ]" />
                </div>

                <div class="col-12 col-sm-6 col-md-4">
              <items-list :items="[
                {
                  col: 'کودک بدون تخت',
                  row: item.childNoBeds
                },
                {
                  col: 'کودک با تخت',
                  row: item.childWithBeds
                }
              ]" />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                  <items-list :items="[
                {
                  col: 'نیم شارژ ورود',
                  row: item.halfChargeIn > 0 ? 'دارد' : 'ندارد'
                },
                {
                  col: 'نیم شارژ خروج',
                  row: item.halfChargeOut > 0 ? 'دارد' : 'ندارد'
                }
              ]" />
              </div>
              </div>
                  <div
                 style="border: 1px solid #0000001f;"
                  class="border-radius border q-ma-sm row text-left q-px-sm q-mx-sm">
                    <h4  class="h4 font-bold">توضیحات :
                         <span class="h4-5 font-regular">
                        {{ item.note != null? item.note : '___' }}
                         </span>
                        </h4>
                    </div>
                <TableList hide_buttom :hide_header="true" :hide_header_top_left="true"
                style="padding:0!important;"
                 :disable_column_search="true" :title="null"
                 :rows="item.guests" :columns="roomColumns"
                :bordered="true" >
                <template v-slot:row-genderDesc="{row}">
                  <div class="font-en-num-regular text-center">{{row.genderDesc === 'null' ? '':row.genderDesc  }}</div>
                </template>
                </TableList>
                <TableList v-if="item.status===3" hide_buttom :hide_header="true" :disable_column_search="true" :hide_header_top_left="true"
                style="padding:0!important;"
                  :rows="[{
                     penlatyDateStr: item.penlatyDateStr,
                     cancelPercent: item.cancelPercent,
                     cancelTypeStr: item.cancelTypeStr,
                     penaltyAmount: item.penaltyAmount
                   }]" :bordered="true" :columns="cancelationTableColumns">
                   <template v-slot:row-penaltyAmount="{row}">
                  <div class="font-bold text-center">{{splitter(row.penaltyAmount)  }}</div>
                </template>
              </TableList>
            </q-card-section>

          </template>
          </ExpansionList>
        </div>
      </template>
    </CardPanel>

    <CardPanel flat :hide_header="true" :hide_actions="true">
      <template #card-sections>
        <q-card-section  v-if="t3" style="padding: 0;">
        <!-- <TableList hide_buttom :hide_header="true" :disable_column_search="true"

        :hide_header_top_left="true" :rows="reserveDetails.detailReserves"
         :columns="finantialInfo" title="اطلاعات مالی"
        :bordered="true">
        <template v-slot:row-percentAll="{row}">
          <div class="accepted text-center">%{{ row.percentAll }}</div>
        </template>
        <template v-slot:row-penaltyAmount="{row}">
          <div class="error text-center">{{ splitter(row.penaltyAmount) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-cancelPercent="{row}">
          <div class="error text-center">{{ row.cancelPercent }} <span class="h6"> % </span></div>
        </template>
        <template v-slot:row-roomId="{row}">
          <div class="font-en-num-regular text-center">{{ row.roomId }}</div>
        </template>
        <template v-slot:row-halfChargeIn="{row}">
          <div class="font-regular text-center">{{ splitter(row.halfChargeIn) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-id="{row}">
          <div class="font-regular text-center">{{ row.id }}</div>
        </template>
        <template v-slot:row-boardTypeDesc="{row}">
          <div class="font-regular text-center">{{ row.boardTypeDesc }}</div>
        </template>
        <template v-slot:row-roomReserveTypeDesc="{row}">
          <div class="font-regular text-center">{{ row.roomReserveTypeDesc }}</div>
        </template>
        <template v-slot:row-totalPrice="{row}">
          <div class="font-regular text-center">{{ splitter(row.totalPrice) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-halfChargeOut="{row}">
          <div class="font-regular text-center">{{ splitter(row.halfChargeOut) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-penlatyDateStr="{row}">
          <div class="font-regular text-center">{{row.penlatyDateStr}} </div>
        </template>
        <template v-slot:row-services="{row}">
          <div class="font-regular text-center">{{ row.dailyDetailReserve.map(item => item.services).reduce((partialSum, a) => partialSum + a, 0) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-cancelTypeStr="{row}">
          <div class="font-regular text-center">{{row.cancelTypeStr}} </div>
        </template>

      </TableList> -->
      </q-card-section>
      <q-card-section >
        <TableList hide_buttom :hide_header="true" :disable_column_search="true"
         :hide_header_top_left="true"
         style="padding:0!important;"
         ref="finantialDetailsTable"
         :rows="finantialDetails" :bordered="true" :columns="finantialDetailsColumns"
          title="جزئیات مالی">
          <template v-slot:row-percentAll="{row}">
          <div class="row-style accepted text-center">%{{ row.percentRoom }}</div>
        </template>
        <template v-slot:row-totalPrice="{row}">
          <div class="font-demi-bold text-center">{{ row.totalPrice }} <span class="font-demi-bold h6"> ریال </span></div>
        </template>
        <template v-slot:row-roomId="{row}">
          <div class="font-en-num-regular text-center">{{ row.roomId }}</div>
        </template>
        <template v-slot:row-roomName="{row}">
          <div class="font-demi-bold text-center">{{ row.roomName }}</div>
        </template>
        <template v-slot:row-id="{row}">
          <div class="font-regular text-center">{{ row.id }}</div>
        </template>
        <template v-slot:row-persianDateVal="{row}">
          <div class="font-regular h5 text-center">{{ row.persianDateVal }}</div>
        </template>
        <template v-slot:row-boardExtraBedPrice="{row}">
          <div class="font-demi-bold text-center" v-if="row.boardExtraBedPrice === 0">-</div>
          <div class="font-demi-bold text-center" v-else>
            {{ row.percentBed >0 ?splitter(row.boardExtraBedPriceWithDisscount) : splitter(row.boardExtraBedPrice) }} <span class="h6"> ریال </span></div>
        </template>
        <template v-slot:row-boardPriceWithDisscount="{row}">
          <div class="font-demi-bold text-center">{{ splitter(row.boardPriceWithDisscount) }} <span class="font-demi-bold h6"> ریال </span></div>
        </template>
        <template v-slot:row-services="{row}">
          <div class="font-regular text-center" v-if="row.services === 0">-</div>
          <div class="font-regular text-center" v-else>{{ splitter(row.services) }} <span class="font-demi-bold h6"> ریال </span></div>
        </template>
        <template v-slot:row-childWithBed="{row}">
          <div class="font-demi-bold text-center" v-if="row.childWithBed > 0">{{ splitter(row.childWithBed) }} <span class="font-demi-bold h6">ریال </span></div>
          <div class="font-demi-bold text-center" v-else>-</div>
        </template>
        <template v-slot:row-childNoBed="{row}">
          <div class="font-regular text-center" v-if="row.childNoBed > 0">{{ splitter(row.childNoBed) }} <span class="h6"> ریال </span></div>
          <div class="font-regular text-center" v-else>-</div>

        </template>
        <template v-slot:row-halfChargeIn="{row}">
          <div class="font-demi-bold text-center" v-if="row.halfChargeIn === 0">-</div>
          <div class="font-demi-bold text-center" v-else>{{ splitter(row.halfChargeIn) }} <span class="font-demi-bold h6"> ریال </span></div>
        </template>
        <template v-slot:row-halfChargeOut="{row}">
          <div class="font-regular text-center" v-if="row.halfChargeOut === 0">-</div>
          <div class="font-regular text-center" v-else>{{ splitter(row.halfChargeOut) }} <span class="h6"> ریال </span></div>
        </template>
          </TableList>
      </q-card-section>
      <q-card-section>
      </q-card-section>
      <q-card-section  >
        <div class="justify-center text-center row" v-if="reserveDetails.totalPrice != null">
          <div class="font-bold h2">جمع قابل پرداخت:  </div>
          <div :class="'text-primary font-medium h2 '"> {{ splitter(reserveDetails.totalPrice) }} ریال</div>
        </div>
      </q-card-section>
      <q-card-section >
        <div class="row">
          <div class="col-12 font-bold h3 q-px-lg"> اطلاعات پرداخت :</div>
        </div>
        <div class="row" >
            <q-card class="style col-sm-5 col-12" flat bordered>
                  <q-card-section style="border-bottom: 1px solid #0000001f;">
                      <header-5 class="relative-left items-center extra-bold">صورتحساب</header-5>
                  </q-card-section>
                  <q-card-section class="justify-center">
                    <div v-for="(img,index) in billImgs" :key="index" style="display: inline-block;">
                      <q-img v-if="img.documentType === 1"
                      :src="`data:${detectMimeTypee(img.base64)};base64,${img.base64}`"
                        spinner-color="white"
                        style="height: 100px; max-width: 200px;display: inline-block;"
                        width="200px"
                        height="100px"
                        img-class="my-custom-image"
                        class="rounded-borders q-ma-sm"
                      >
                        <div class="absolute-full text-subtitle2 flex flex-center"
                         style="background: transparent;">
                          <q-btn flat icon="delete" color="negative" size="md" @click="billImgs[index] = null" unelevated />
                          <q-btn unelevated flat icon="download" color="positive" size="md" @click="downloadReceipeImg(`data:${detectMimeTypee(img.base64)};base64,${img.base64}`)"/>
                        </div>
                      </q-img>
                      <div style="display: inline-block;" v-else>
                        <q-img
                        src="../../../public/pdf_icon.png"
                        spinner-color="white"
                        style="height: 100px; max-width: 180px;"
                        width="90px"
                        height="150px"
                        img-class="my-custom-image"
                        class="rounded-borders q-ma-sm"
                      >
                        <div class="absolute-full text-subtitle2 flex flex-center"
                         style="background: transparent;">
                          <q-btn unelevated flat icon="delete" color="negative" size="md" @click="billImgs[index] = null" />
                          <q-btn unelevated flat icon="download" color="positive" size="md" @click="downloadReceipePdf(`data:${detectMimeTypee(img.base64)};base64,${img.base64}`)"/>
                        </div>
                      </q-img>
                      </div>
                      </div>
                  </q-card-section>
                  <q-card-actions align="right" class="absolute-bottom q-ml-md" >
                    <q-file style="width:30px;" standout="bg-grey-5 text-white" rounded
                   accept=".jpg, .pdf, .png" @update:model-value="uploadImage($event,true)">
                    <template v-slot:append>
                      <q-icon name="attach_file" style="cursor: pointer;margin-right:-20px;" @click.stop />
                    </template>
                    </q-file>

                  </q-card-actions>

                  <q-inner-loading :showing="uploadLoader1">
                    <q-spinner
                      color="primary"
                      size="5em"
                    />
                  </q-inner-loading>
              </q-card>
              <q-card class="style col-sm-6 col-12" flat bordered>
                  <q-tabs v-model="tab" class="regality">
                    <q-tab label="پرداخت آنلاین" name="one" v-if="reserveDetails.cartNumber == null"/>
                    <q-tab label="پرداخت از طریق فیش واریزی" name="two" v-if="reserveDetails.tracking == null"/>
                  </q-tabs>

                  <q-separator />
                  <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="one">
                    <div class="row font-medium h4-5 q-pa-sm">شماره پیگیری : {{ reserveDetails.tracking }}</div>
                    <div class="row font-medium h4-5 q-pa-sm">کد مرجع  : {{ reserveDetails.securePan }}</div>
                    <div class="row">
                      <div class="col-md-6 font-medium h4-5 q-pa-sm"> </div>
                      <div class="col-md-6">
                        <q-btn unelevated label="پرداخت آنلاین" dense outline color="accent" class="q-px-lg"/>
                      </div>
                    </div>
                    <!-- <div class="row font-medium h4-5 q-pa-sm">کد مرجع  : {{ reserveDetails.securePan }}</div> -->

                  </q-tab-panel>
                  <q-tab-panel name="two" style="min-height:100px!important;">
                    <div class="col-md-6 font-medium h4-5 q-pa-sm">شماره کارت : {{reserveDetails.cartNumber}} </div>
                    <div class="row font-medium h4-5 q-pa-sm"> شماره شبا  : {{ reserveDetails.shabaNumber }}</div>

                    <div v-for="(img,index) in receipeImgs" :key="index" style="display: inline-block;">
                    <q-img v-if="img.documentType === 1"
                        :src="`data:${detectMimeTypee(img.base64)};base64,${img.base64}`"
                        spinner-color="white"
                        style="height: 100px; max-width: 200px;display: inline-block;"
                        width="200px"
                        height="100px"
                        img-class="my-custom-image"
                        class="rounded-borders q-ma-sm"
                      >
                        <div class="absolute-full text-subtitle2 flex flex-center"
                         style="background: transparent;">
                          <q-btn unelevated flat icon="delete" color="negative" size="md" @click="deleteReceipeImg(index)" />
                          <q-btn unelevated flat icon="download" color="positive" size="md" @click="downloadReceipeImg(`data:${detectMimeTypee(img.base64)};base64,${img.base64}`)"/>
                        </div>
                      </q-img>
                      <div style="display: inline-block;" v-else>
                        <q-img
                        src="../../../public/pdf_icon.png"
                        spinner-color="white"
                        style="height: 100px; max-width: 180px;"
                        width="90px"
                        height="150px"
                        img-class="my-custom-image"
                        class="rounded-borders q-ma-sm"
                      >
                        <div class="absolute-full text-subtitle2 flex flex-center"
                         style="background: transparent;">
                          <q-btn unelevated flat icon="delete" color="negative" size="md" @click="deleteReceipeImg(index)" />
                          <q-btn unelevated flat icon="download" color="positive" size="md" @click="downloadReceipePdf(`data:${detectMimeTypee(img.base64)};base64,${img.base64}`)"/>
                        </div>
                      </q-img>
                      </div>
                    </div>

                      <q-file standout="bg-grey-5 text-white"  rounded
                       style="width:30px;position:absolute;left:1.5%;bottom:2%;max-height:50px!important;"
                       accept=".jpg, .pdf, .png"
                       v-model="uploadableImg" @update:model-value="uploadImage($event,false)" >
                      <template v-slot:append>
                        <q-icon name="attach_file"
                        style="cursor: pointer;margin-right:-20px;" @click.stop />
                      </template>
                      </q-file>
                      <q-inner-loading :showing="uploadLoader2">
                    <q-spinner
                      color="primary"
                      size="5em"
                    />
                  </q-inner-loading>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
          </div>
        </q-card-section>
      </template>
    </CardPanel>
    <div ref="tickets"></div>
    <CardPanel flat :show_deafult_btns="false" hide_header>
      <template #card-sections>
    <q-card-section >
          <div id="virtual-scroll-target" >
        <div class="row ">
          <div class="h2 font-extra-bold col-3">تیکت ها</div>

        <div class="col-9 q-pr-md" style="text-align: left">
          <q-btn dense outline class="sm-style" @click="createTicketDialog = true" unelevated
           color="primary" label="ایجاد تیکت جدید" icon="add" style="margin-top:0;"/>
        </div>
        </div>
        <q-virtual-scroll v-if="tickets.length != 0"
        :items="tickets" v-slot="{ item }" class="scroll"
        style="min-height:fit-content;max-height: 90vh; width: 100%;margin-bottom:-75px;">
          <SendRecieveTicketsPanel
          style="box-shadow: none!important;"
          :value="item"
          :showReserveNumber="false"
          @on-notify="onNotify"
          ref="sendTicketDialogRef"
          @on-send-ticket="onSendNewTicket($event, item)"
          @on-success="onTicketDetails(instanceModel)" />
        </q-virtual-scroll>
        </div>
    </q-card-section>
  </template>
    </CardPanel>

    <CreateTicketDialog  v-if="createTicketDialog"
    :has_org="panel === 'agency' ? hotelDetails.id : reserveDetails.agencyId"
    :panel="panel"
    ref="createTicketRef"
    v-model="createTicketDialog"
    :reserve-id="reserveDetails.id"
    @on-notify="onNotify"
    @on-success="getTickets"/>
    <CardPanel flat :hide_header="true" :hide_actions="true" >
      <template #card-sections>
        <q-card-section>
      <TableList
      v-if="loadHistory" :bordered="true"
      hide_buttom :hide_header="true" :disable_column_search="true"
       :rows="reserveDetails.reserveHistories" :columns="reserveHistoriesColumns"
        title="تاریخچه این رزرو:" :hide_header_top_left="true"/>
    </q-card-section>
    </template>
    </CardPanel>

      <q-dialog v-model="printDialog">
        <CardPanel title="چاپ" size="40%" helpIcon="help_outline"
        description="درصورت تمایل میتوانید از جزپیات این رزرو پرینتی دریافت کنید."        >

          <template #body>
            <div class="column" style="margin-bottom: -10px;margin-top: -20px;">
              <q-checkbox size="sm" class="style" label="اطلاعات کلی رزرو" v-model="t1" disable />
              <q-checkbox size="sm" class="style" label="جزئیات اتاق ها" v-model="t2" disable/>
              <!-- <q-checkbox size="sm" class="style" label="اطلاعات کلی مالی" v-model="t3"/>
              <q-checkbox size="sm" class="style" label="جزئیات مالی" v-model="t4"/>
              <q-checkbox size="sm" class="style" label="نحوه پرداخت" v-model="t5"/> -->
              <q-checkbox size="sm" class="style" label="تیکت های این رزرو" v-model="t6"/>
              <q-checkbox size="sm" class="style" label="تاریخچه این رزرو" v-model="t7"/>
            </div>
          </template>

          <template #actions>
            <q-btn unelevated label="چاپ" icon="o_print" color="primary"  class="col-6 style col-sm-3"
             style="max-width: 200px;" type="submit" @click="exportToPDF"/>
            <q-btn unelevated label="لغو" outline icon="close" color="negative" class="col-6 style col-sm-3"
             style="max-width: 200px;" v-close-popup/>
          </template>
        </CardPanel>
      </q-dialog>
    </q-page>
  </transition>

  <q-inner-loading :showing="hotelDetails == null || reserveDetails == null">
    <q-spinner-gears size="10em" color="primary" />
  </q-inner-loading>

  <q-dialog v-model="cancelationDialog">
    <card-panel ref="cancelationDialogRef" size="60%" title="کنسل کردن اتاق ها (انتخاب کنید)"
    @on-submit="onCancelRooms"
    :disable-notify="true"
    @on-success="onSuccessCancelDialog">
      <template #body>
        <q-option-group
          v-model="canceledRooms"
          :options="totalCanceledRooms"
          type="checkbox"
          color="primary"
          class="style"
          inline
        />
      </template>
      <template #actions>
        <q-btn label="نمایش جریمه"  color="primary" class="col-6 style col-sm-3" type="submit" :loading="loader" unelevated/>
        <q-btn label="لغو"  color="negative" outline class="col-6 style col-sm-3"  v-close-popup unelevated/>
      </template>
    </card-panel>
  </q-dialog>
  <q-dialog v-model="noShowDialog">
    <card-panel ref="noShowDialogRef" size="60%" title="نوشو کردن اتاق ها (انتخاب کنید)"
    @on-submit="doNoshow"
    :disable-notify="false"
    @on-success="noShowDialog=false;getReserveDetails()">
      <template #body>
        <q-option-group
          v-model="noShowedRooms"
          :options="totalCanceledRooms"
          type="checkbox"
          color="primary"
          size="sm"
          inline
        />
        <div class="font-demi-bold h3-4 q-px-md q-pb-sm q-pt-lg" v-if="noShowedRooms.length>0">انتخاب حالت نوشو :</div>
        <q-option-group
        v-if="noShowedRooms.length>0"
            v-model="noshoType"
            :options="totalNoShowTypes"
            color="primary" inline
            size="sm" keep-color
          />
      </template>
    </card-panel>
  </q-dialog>

  <q-dialog v-model="cancelationWithoutPenaltyDialog">
    <card-panel ref="cancelationWithoutPenaltyDialogRef" size="60%" title="کنسلی بدون جریمه اتاق ها (انتخاب کنید)"
    @on-submit="doNoshow(false)"
    :disable-notify="false"
    @on-success="cancelationWithoutPenaltyDialog=false;getReserveDetails()">
      <template #body>
        <q-option-group
          v-model="noShowedRooms"
          :options="totalCanceledRooms"
          type="checkbox"
          color="primary"
          size="sm"
          inline
        />

      </template>
    </card-panel>
  </q-dialog>

  <q-dialog v-model="estelamPopUpDialog">
    <card-panel ref="estelamPopUpDialogRef" size="30%"
    @on-submit="estelamPopUpDialog=false"
    :disable-notify="true"
    @on-success="estelamPopUpDialog=false">
      <template #body>
        <div class="h3-4 font-regular text-center">
          این رزرو انتظار تایید هتل میباشد
        </div>
      </template>
      <template #actions>
        <q-btn label="متوجه شدم!" outline color="primary" class="col-7 style" type="submit" unelevated/>
      </template>
    </card-panel>
  </q-dialog>

  <q-dialog v-model="cancelationFinalDialog">
    <card-panel ref="cancelationFinalDialogRef" size="60%" title="کنسل کردن اتاق ها"
    @on-submit="onFinalCancelation"
    @on-success="onSuccessCancelationDialog">
      <template #body v-if="this.getPenalty.details.length != 0">
        <TableList hide_buttom :hide_header="true" :disable_column_search="true" :hide_header_top_left="true"
         :rows="this.getPenalty.details" :bordered="true" :columns="getPenaltyDetailsColumns">
          <template v-slot:row-penalty="{row}">
          <div class="row-style text-center">{{ splitter(row.penalty) }}ریال</div>
        </template>
        <template v-slot:row-roomName="{row}">
          <div class="row-style text-center color-cgrey">{{ row.roomName }}</div>
        </template>
        </TableList>

        <div class="h4 font-medium text-center">مبلغ کل کنسلی:
          <span class="h3-4 font-demi-bold text-center">{{ splitter(this.getPenalty.totalPenalty) }}</span>
          <span class="h4-5 font-demi-bold text-center">ریال</span>
      </div>
      </template>

      <template #body v-else>
        <div class="h4 font-medium">امکان کنسل کردن این رزرو وجود ندارد</div>
      </template>
      <template #actions v-if="this.getPenalty.details.length === 0">
        <q-btn unelevated label="بستن" outline color="negative" class="col-6 style col-sm-3" style="max-width: 200px;" v-close-popup/>
      </template>
      <template #actions v-else>
        <q-btn unelevated label="ثبت کنسلی "  color="primary" class="col-6 style col-sm-3" type="submit" :loading="loader"/>
        <q-btn unelevated label="لغو"  color="negative" outline class="col-6 style col-sm-3"  v-close-popup/>
      </template>
    </card-panel>
  </q-dialog>

  <q-dialog v-model="logDialog">
    <card-panel ref="logDialogRef" size="70%" title="لاگ ها">
      <template #body>

        <q-virtual-scroll
          style="max-height: 60vh"
          :items="resrveLogs"
          v-slot="{ item }"
        >
        <div class="h5 font-regular">
          <div class="h3 font-demi-bold q-pb-sm">ریکوئست</div>
          {{ item.request }}
        </div>
        <hr  style="max-width:50%;background-color: #757575;" >
        <div class="h5 font-regular">
          <div class="h3 font-demi-bold q-pb-sm">ریسپانس</div>
          {{item.response}}
        </div>
          <span class="color-cgrey h5-6 q-mr-auto q-px-md" style="float: left;">{{item.createdStr}}</span>
          <span class="color-cgrey h5-6 q-mr-auto" style="float: left;"> {{item.time}} </span>
        <br>
        <hr v-if="resrveLogs.length>1">
        </q-virtual-scroll>
      </template>

      <template #actions>
        <q-btn unelevated label="بستن" outline color="negative" class="col-6 style col-sm-3" style="max-width: 200px;" v-close-popup/>
      </template>

    </card-panel>
  </q-dialog>

  <q-dialog v-model="estelamReserveDialog" :persistent="true">
    <card-panel
    size="80%"
    :title="getUnavailableRoom"
    ref="estelamCardPanel"
    :disableNotify="false"
    @on-submit="onSubmitEstelamReserve"
    @on-success="$router.go()">
      <template #body>
        <GuestsDetailsPanel v-for="item in reserveDetailsForSale.reservesDetails"
         :key="item" :capacity="item.capacity" :guests="item.createGuestCommands" :title="`مهمانان اتاق ${item.roomName}`"/>
      </template>

      <template #actions>
        <q-btn
        unelevated
        label="پرداخت اعتباری"
        color="primary"
        class="col-6 style col-sm-3"
        style="max-width: 200px;"
        :loading="loading"
        @click="onSubmitEstelamReserve"/>
        <q-btn
        unelevated
        label="پرداخت آنلاین"
        color="primary"
        class="col-6 style col-sm-3"
        style="max-width: 200px;"
        :loading="loading"
        type="submit"
        @click="onSubmitEstelamReserve"/>
        <q-btn
        unelevated
        v-if="show_deafult_btns==null"
        label="بستن"
        outline
        color="negative"
        class="col-6 style col-sm-3"
        style="max-width: 200px;"
        v-close-popup/>
      </template>
    </card-panel>
  </q-dialog>

  <q-dialog v-model="editVoucher">
    <card-panel
    title="تغییر ووچر"
    ref="editVoucherRef"
    @on-submit="onSubmitEditVoucher"
    @on-success="onSucessEditVoucher"
    size="60%">
      <template #body>
        <div class="row">
          <div class="col-12 col-sm-6">
            <q-input
            label="قیمت کلی"
            filled
            type="text"
            v-model="reserveDetailsForEdit.totalPrice"
            @update:model-value="updatePrice('totalPrice')"
            class="style"/>
          </div>
          <div class="col-12 col-sm-6">
            <q-select
            class="style"
            label="وضعیت رزرو"
            filled
            :options="reserveStatus"
            v-model="reserveDetailsForEdit.statusObj"
            @update:model-value="reserveDetailsForEdit.status = $event.value" />
          </div>
          <div class="col-12 col-sm-6">
            <q-select
            class="style"
            label="وضعیت پرداخت"
            filled
            :options="isPayed"
            v-model="reserveDetailsForEdit.isPayedObj"
            @update:model-value="reserveDetailsForEdit.isPayed = $event.value" />
          </div>
          <div class="col-12 q-mt-lg">
            <q-expansion-item
              group="somegroup"
              :label="item.roomName"
              default-opened
              header-class="bg-light"
              v-for="item in reserveDetailsForEdit.detailReserves"
              :key="item.id"
            >
              <q-card>
                <q-card-section>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <q-select
                      label="برد فروش"
                      class="style"
                      filled
                      :options="boardTypes"
                      v-model="item.boardTypeObj"
                      @update:model-value="item.boardType = $event.value" />
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-select
                      label="اتاق"
                      class="style"
                      filled
                      :options="roomsList"
                      v-model="item.roomIdObj"
                      @update:model-value="item.roomId = $event.value" />
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-input label="قیمت کلی" filled class="style" v-model="item.totalPrice"/>
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-input label="درصد کنسلی" filled class="style" v-model="item.cancelPercent"/>
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-input label="مقدار جریمه" filled class="style" v-model="item.penaltyAmount"/>
                    </div>
                    <div class="col-12 col-sm-6">
                      <q-select
                        class="style"
                        label="وضعیت اتاق رزرو شده"
                        filled
                        :options="reserveStatus"
                        v-model="item.statusObj"
                        @update:model-value="item.status = $event.value" />
                    </div>
                    <q-table
                    class="col-12"
                    :columns="editVoucherRoomsColumns"
                    :rows="item.dailyDetailReserve">
                    <template v-slot:body-cell-totalPrice="props">
                        <q-td key="date" :props="props">
                          <q-input
                          dir="ltr"
                          filled
                          v-model="props.row.totalPrice"
                          class="style" />
                        </q-td>
                    </template>
                    </q-table>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator />
          </div>
        </div>
      </template>
    </card-panel>
  </q-dialog>
</template>

<script>
import ExpansionList from 'src/components/Expansion-List.vue'
import ItemsList from 'src/components/Items-List.vue'
import TableList from 'src/components/Table-List.vue'
import SendRecieveTicketsPanel from 'components/Send-Recieve-Ticket-Panel.vue'
import CreateTicketDialog from 'src/components/Tickets/Create-Ticket-Dialog.vue'
import CardPanel from 'src/components/Card-Panel.vue'
import GuestsDetailsPanel from 'src/components/Buy/Guests-Details-Panel.vue'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { makeTripple } from '../../functions/tripleSplitterForNumbers'
import { onSetEstelamCreationByHotel, onSetEstelamValidation } from 'src/functions/apis'
import { getpanelName, guidIsSeen, stopGuide } from 'src/stores/localStoreVariables'
import { reserveStatus, isPayed, boardTypes } from 'src/stores/reserveFilters'
import { editReserveApi } from 'stores/api'
import { copyToClipboard } from 'src/functions/handyStuff'
import { urls } from 'src/functions/urls'
import { detectMimeType } from 'src/stores/decodeBase64'
const getPenaltyDetailsColumns = [
  {
    name: 'roomName',
    label: 'نام اتاق',
    field: 'roomName'
  },
  {
    name: 'penalty',
    label: 'جریمه کنسلی',
    field: 'penalty'
  },
  {
    name: 'penaltyPercent',
    label: 'درصد کنسلی',
    field: 'penaltyPercent'
  },
  {
    name: 'appliedOnStr',
    label: 'اعمال جریمه بر',
    field: 'appliedOnStr'
  }
]
const roomColumns = [
  {
    name: 'id',
    label: 'ردیف',
    field: 'id'
  },
  {
    name: 'genderDesc',
    label: 'جنسیت',
    field: 'genderDesc'
  },
  {
    name: 'fName',
    label: 'نام',
    field: 'fName'
  },
  {
    name: 'lName',
    label: 'نام خانوادگی',
    field: 'lName'
  },
  {
    name: 'email',
    label: 'ایمیل',
    field: 'email'
  },
  {
    name: 'nationalCode',
    label: 'کد ملی',
    field: 'nationalCode'
  }
]

const finantialInfo = [

  {
    name: 'id',
    label: 'شماره رزرو اتاق',
    field: 'id'
  },
  {
    name: 'boardTypeDesc',
    label: 'وعده غذایی',
    field: 'boardTypeDesc'
  },
  {
    name: 'boardTypeDesc',
    label: 'برد فروش',
    field: 'boardTypeDesc'
  },
  {
    name: 'roomReserveTypeDesc',
    label: 'نوع فروش',
    field: 'roomReserveTypeDesc'
  },
  {
    name: 'services',
    field: 'services',
    label: 'مجموع نرخ سرویس'
  },
  // {
  //   name: 'boardPriceWithDisscount',
  //   label: 'مجموع قیمت اتاق تمام شبها',
  //   field: 'boardPriceWithDisscount'
  // },

  {
    name: 'halfChargeIn',
    label: 'نیم شارژ ورود',
    field: 'halfChargeIn'
  },
  {
    name: 'halfChargeOut',
    label: 'نیم شارژ خروج',
    field: 'halfChargeOut'
  },
  {
    name: 'penaltyAmount',
    label: 'مبلغ جریمه کنسلی',
    field: 'penaltyAmount'
  },
  {
    name: 'cancelPercent',
    label: 'درصد کنسلی',
    field: 'cancelPercent'
  },
  {
    name: 'penlatyDateStr',
    label: 'تاریخ کنسلی',
    field: 'penlatyDateStr'
  },
  {
    name: 'cancelTypeStr',
    label: 'نوع کنسلی',
    field: 'cancelTypeStr'
  },

  {
    name: 'totalPrice',
    label: 'قیمت نهایی',
    field: 'totalPrice'
  },
  {
    name: 'percentAll',
    label: 'تخفیف',
    field: 'percentAll'
  }
]

const finantialDetailsColumns = [

  {
    name: 'roomId',
    label: 'شماره رزرو اتاق',
    field: 'roomId'
  },
  {
    name: 'roomName',
    label: 'نوع اتاق',
    field: 'roomName'
  },
  {
    name: 'persianDateVal',
    label: 'تاریخ',
    field: 'persianDateVal'
  },
  {
    name: 'boardPriceWithDisscount',
    label: 'نرخ اتاق',
    field: 'boardPriceWithDisscount'
  },
  {
    name: 'services',
    label: 'نرخ سرویس',
    field: 'services'
  },
  {
    name: 'boardExtraBedPrice',
    label: 'تخت اضافه',
    field: 'boardExtraBedPrice'
  },
  {
    name: 'childWithBed',
    label: 'کودک با تخت',
    field: 'childWithBed'
  },
  {
    name: 'childNoBed',
    label: 'کودک بدون تخت',
    field: 'childNoBed'
  },
  {
    name: 'halfChargeIn',
    label: 'نیم شارژ ورود',
    field: 'halfChargeIn'
  },
  {
    name: 'halfChargeOut',
    label: 'نیم شارژ خروج',
    field: 'halfChargeOut'
  },
  {
    name: 'totalPrice',
    label: 'قیمت نهایی',
    field: 'totalPrice'
  },
  {
    name: 'percentAll',
    label: 'تخفیف',
    field: 'percentAll'
  }
]

const reserveHistoriesColumns = [
  {
    label: 'ردیف',
    name: 'index',
    field: 'index'
  },
  {
    label: 'عملیات',
    name: 'strReserveActionType',
    field: 'strReserveActionType'
  },
  {
    label: 'توسط',
    name: 'user',
    field: 'user'
  },
  {
    label: 'تاریخ',
    name: 'persianDateTime',
    field: 'persianDateTime'
  }
]

const cancelationTableColumns = [
  {
    label: 'تاریخ',
    name: 'penlatyDateStr',
    field: 'penlatyDateStr'
  },
  {
    label: 'درصد کنسلی',
    name: 'cancelPercent',
    field: 'cancelPercent'
  },
  {
    label: 'محاسبه از',
    name: 'cancelTypeStr',
    field: 'cancelTypeStr'
  },
  {
    label: 'مبلغ جریمه',
    name: 'penaltyAmount',
    field: 'penaltyAmount'
  }
]

const editVoucherRoomsColumns = [
  {
    label: 'مبلغ کل',
    name: 'totalPrice',
    field: 'totalPrice',
    align: 'center'
  },
  {
    label: 'تاریخ',
    name: 'persianDateVal',
    field: 'persianDateVal',
    align: 'center'
  }
]

const ticketUrls = {
  admin: {
    sendUrl: 'Ticket/sendTicketMessageMgmt',
    createUrl: 'Ticket/createTicketMessageMgmt',
    createTicketUrl: 'Ticket/createTicketFromMgmt'
  },

  agency: {
    sendUrl: 'Ticket/sendTicketMessageAgency',
    createUrl: 'Ticket/createTicketMessageAgency',
    createTicketUrl: 'Ticket/createTicketFromAgency'
  },

  hotel: {
    sendUrl: 'Ticket/sendTicketMessage',
    createUrl: 'Ticket/createTicketMessage',
    createTicketUrl: 'Ticket/createTicketFromHotel'
  }
}
const totalNoShowTypes = [
  {
    label: 'جریمه کنسل صفر',
    value: 0
  },
  {
    label: 'جریمه کنسل ۱۰۰ درصد کل شب ها',
    value: 1
  },
  {
    label: 'جریمه ۱۰۰ درصد شب اول',
    value: 2
  }
]
import { useVOnboarding } from 'v-onboarding'
import { getGuideSteps } from 'src/stores/guideSteps'
export default {

  setup () {
    const wrapper = ref(null)
    const guide = useVOnboarding(wrapper)
    const steps = ref([])

    return {
      steps,
      guide,
      wrapper,
      doSeenFn: ref(true),
      organizationForTicket: ref({}),
      createTicketDialog: ref(false),
      expandAllForPrint: false,
      panelName: ref('admin'),
      estelamReserveDialog: ref(false),
      reserveDetailsForSale: ref({}),
      noshow: ref(false),
      disableIsSeen: ref(false),
      cancelRoomDisableNotifies: ref(false),
      getPenaltyDetailsColumns,
      resrveLogs: ref([]),
      logLoader: ref(false),
      logDialog: ref(false),
      editVoucher: ref(false),
      reserveStatus,
      editVoucherRoomsColumns,
      roomsList: ref([]),
      isPayed,
      boardTypes
    }
  },
  data () {
    const tickets = ref([])
    this.getReserveDetails()
    const disableCancelation = this.$route.query.disableCancelation
    const panel = getpanelName()
    const ownTicketUrls = ref(ticketUrls[panel])
    this.setSteps(panel)

    return {
      receipeImgs: ref([]),
      billImgs: ref([]),
      uploadableImg: ref(null),
      t1: ref(true),
      t2: ref(true),
      t3: ref(true),
      t4: ref(true),
      t5: ref(true),
      t6: ref(true),
      t7: ref(false),
      tab: ref('one'),
      list: ref(null),
      roomDetails: ref(null),
      hotelDetails: ref({}),
      accepted: ref(false),
      printDialog: ref(false),
      roomColumns,
      finantialInfo,
      finantialDetailsColumns,
      reserveHistoriesColumns,
      cancelationTableColumns,
      totalNoShowTypes,
      finantialDetails: ref(null),
      loadHistory: ref(true),
      cancelationDialog: ref(false),
      noShowDialog: ref(false),
      cancelationWithoutPenaltyDialog: ref(false),
      noshoType: ref(0),
      estelamPopUpDialog: ref(false),
      cancelationFinalDialog: ref(false),
      tickets,
      reserveDetails: ref(null),
      disableCancelation,
      canceledRooms: ref([]),
      totalCanceledRooms: ref([]),
      noShowedRooms: ref([]),
      getPenalty: ref(null),
      ownTicketUrls,
      panel,
      loader: ref(false),
      reserveDetailsForEdit: ref(),
      reserveDetailsForAmendment: ref(),
      uploadLoader1: ref(false),
      uploadLoader2: ref(false)
    }
  },
  methods: {
    setSteps (panel) {
      if (panel === 'agency') this.steps = getGuideSteps().agency.voucher
      else if (panel === 'hotel') this.steps = getGuideSteps().hotel.voucher
    },
    startGuiding (page) {
      this.guide.start()
      setTimeout(() => {
        stopGuide(page)
      }, 2000)
    },
    detectMimeTypee (img) {
      return detectMimeType(img)
    },
    scrollToTarget (targetDiv) {
      this.$refs[targetDiv].scrollIntoView({ behavior: 'smooth' })
    },
    async copyToClipboardd (text) {
      await copyToClipboard(text).then(res => {
        this.$emit('on-notify', 'شماره رزرو کپی شد!', 'warning')
      })
    },
    async getLogs () {
      this.logLoader = true
      await api.get(`ReserveService/GetReserveLog/${this.reserveDetails.id}`)
        .then(res => {
          this.resrveLogs = res.data
          this.logLoader = false
          this.logDialog = true
        })
    },
    getTab (payType) {
      this.tab = payType === 1 ? 'two' : 'one'
    },
    estelamiBtnCondition () {
      if ( this.reserveDetails.status === 7) return true
      else if (this.reserveDetails.isInquiry) return true
      else return false
    },
    estelamPopUp () {
      if ((this.panel === 'agency' || this.panel === 'admin') && this.reserveDetails.statusDesc === 'درخواست استعلام') {
        this.estelamPopUpDialog = true
      }
    },
    accessSubmitReserve () {
      if ((this.panel === 'agency' || this.panel === 'admin') && this.reserveDetails.statusDesc === 'تایید استعلام') return true
      else return false
    },
    downloadReceipeImg (base64Image) {
      // Convert base64 to blob
      const byteCharacters = atob(base64Image.split(',')[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)

      // Create a blob from the array buffer
      const blob = new Blob([byteArray], { type: 'image/png' }) // Adjust the MIME type according to your image format

      // Generate a URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Trigger the download
      const link = document.createElement('a')
      link.href = url
      link.download = 'image.png' // Set the desired filename
      document.body.appendChild(link)
      link.click()

      // Clean up and revoke the object URL after the download
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        document.body.removeChild(link)
      }, 100)
    },
    downloadReceipePdf (base64String) {
      const tempLink = document.createElement('a')
      tempLink.href = base64String
      tempLink.download = 'document.pdf'

      document.body.appendChild(tempLink)

      tempLink.click()

      document.body.removeChild(tempLink)
    },
    deleteReceipeImg (index) {
      this.receipeImgs.pop(index)
    },
    async uploadImage (img, isHotel) {
      if (isHotel) this.uploadLoader1 = true
      else this.uploadLoader2 = true
      const url = 'Transaction/CreateBillForReserves'
      const arr = []
      arr.push(this.reserveDetails.id)
      await api.postForm(url, {
        ReserveIds: arr,
        BillFile: img
      })
        .then(response => {
          // if (isreceipt) {

          if (isHotel) this.billImgs.push(response.data[0])
          else this.receipeImgs.push(response.data[0])
          if (isHotel) this.uploadLoader1 = false
          else this.uploadLoader2 = false
          // } else this.billImgs = response.data
        })
        .catch((error) => {
          // console.error(error)
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
          if (isHotel) this.uploadLoader1 = false
          else this.uploadLoader2 = false
        })
    },
    async exportToPDF () {
      this.printDialog = false
      this.reserveDetails.t6 = this.t6
      this.reserveDetails.t7 = this.t7
      this.reserveDetails.tickets = this.tickets
      localStorage.setItem('reserveDetails_print', JSON.stringify(this.reserveDetails))
      localStorage.setItem('hotelDetails', JSON.stringify(this.hotelDetails))
      localStorage.setItem('financialDetails', JSON.stringify(this.finantialDetails))
      window.open('#/reserve_details_print', '_blank')
    },
    splitter (number) {
      if (isNaN(number)) return ' '
      else return makeTripple.splitEvery3(number)
    },

    cancelationBtnConditions () {
      const modified = this.reserveDetails.fromDate.replace(/T00/g, 'T10')
      let date = new Date(modified)
      let today = new Date()
      date = new Date(date)
      today = new Date(today)

      if (this.reserveDetails.status === 1 || this.reserveDetails.status === 13) {
        if (date > today) {
          return true
        } else if (date.getTime() === today.getTime() && today.getHours() < 14) {
          return true
        } else {
          this.noshow = true
          return false
        }
      } else {
        return false
      }
    },

    async onEstelamReserve () {
      this.reserveDetailsForSale = {
        reserveId: this.reserveDetails.id,
        confirmed: true,
        reservesDetails: []
      }

      for (const details of this.reserveDetails.detailReserves) {
        this.reserveDetailsForSale.reservesDetails.push({
          detailReserveId: details.id,
          roomName: details.roomName,
          capacity: details.numberOfGuest,
          createGuestCommands: [{}]
        })
      }
      this.estelamReserveDialog = true
    },

    async getreciepeImgs () {
      await api.get(`Transaction/GetBill/${this.reserveDetails.billId}`)
        .then(response => {
          this.receipeImgs = response.data
        })
        .catch((error) => {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        })
    },
    async getBillImgs () {
      await api.get(`Transaction/GetHotelBill/${this.reserveDetails.billId}`)
        .then(response => {
          this.billImgs = response.data
        })
        .catch((error) => {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        })
    },
    async getReserveDetails () {
      this.loadHistory = false
      await api.get(`ReserveService/GetReserveDetails/${this.$route.params.reserveId}`).then(response => {
        this.reserveDetails = response.data
        this.setReserveForEditObj(this.reserveDetails)
        this.getHotelDetails()
        this.getRoomsForCancelation()

        this.getTab(this.reserveDetails.payType)

        this.getTickets()

        if (this.reserveDetails.billId !== null) {
          this.getreciepeImgs()
          this.getBillImgs()
        }

        this.estelamPopUp()

        this.reserveDetails.reserveHistories.forEach((item, i) => {
          item.index = i + 1
        })
        this.loadHistory = true
        this.list = [
          [
            {
              col: 'تاریخ رزرو',
              row: this.reserveDetails.persianCreatedDate
            },
            {
              col: 'مرجع رزرو',
              row: this.reserveDetails.agencyName
            },
            {
              col: 'نام رزرو کننده',
              row: this.reserveDetails.userName === 'null' ? '__' : this.reserveDetails.userName
            }
          ],
          [
            {
              col: 'تاریخ ورود',
              row: this.reserveDetails.persianFromDateDate
            },
            {
              col: 'تاریخ خروج',
              row: this.reserveDetails.persianToDateDate
            },
            {
              col: 'آخرین مهلت تسویه',
              row: this.reserveDetails.persianToDateDate
            }
          ],
          [
            {
              col: 'اصلاحیه',
              row: this.getEditionLink(),
              hasHtml: true
            },
            {
              col: 'کد واچر هتل',
              // row: this.reserveDetails.id
              row: ''
            },
            {
              col: 'کد مرجع رزرو',
              row: this.reserveDetails.agencyReserveCode,
              row_class: 'font-en-num-regular'
            }
          ]
        ]

        this.getFinantilInfo()
        const goto = localStorage.getItem('goTo')

        if ((this.doSeenFn && !this.reserveDetails.isSeen) && ((this.panel === 'hotel' || this.panel === 'supplier') && goto == null)) {
          this.accepted = true
          this.onSeenReserve(true)
        }
      })
      this.loadHistory = true
      this.doSeenFn = false
    },
    getEditionLink () {
      if (this.reserveDetails.nextReserveId != null) return `<a href='${urls.reserveDetailsUrl(this.reserveDetails.nextReserveId)}' target="_blank">اصلاح شده از</a>`
      else if (this.reserveDetails.previousReserveId != null) return `<a href='${urls.reserveDetailsUrl(this.reserveDetails.previousReserveId)}' target="_blank" >اصلاحیه رزرو</a>`
      else return ''
    },
    onSubmitEditVoucher () {
      this.reserveDetailsForEdit.totalPrice = makeTripple.numberWithOutCommas(this.reserveDetailsForEdit.totalPrice)
      this.$refs.editVoucherRef.submit({
        url: editReserveApi.getConfigProperties('edit').url,
        value: this.reserveDetailsForEdit
      })
    },
    // onSucessEditVoucher (res) {
    //   setTimeout(() => { this.$router.go(0) }, 2)
    // },

    setReserveForEditObj (reserve) {
      this.roomsList = []
      this.reserveDetailsForEdit = JSON.parse(JSON.stringify(reserve))
      this.reserveDetailsForAmendment = JSON.parse(JSON.stringify(reserve))
      // this.setReserveForAmendment()
      this.reserveDetailsForEdit.statusObj = reserveStatus.find(item => this.reserveDetailsForEdit.status === item.value)
      this.reserveDetailsForEdit.isPayedObj = isPayed.find(item => this.reserveDetailsForEdit.isPayed === item.value)
      this.reserveDetailsForEdit.totalPrice = makeTripple.numberWithCommas(this.reserveDetailsForEdit.totalPrice)
      this.reserveDetailsForEdit.detailReserves.forEach(item => {
        item.boardTypeObj = boardTypes.find(i => item.boardType === i.value)
        item.statusObj = reserveStatus.find(i => item.status === i.value)
        item.roomIdObj = {
          label: `${item.roomName}, ${item.roomReserveTypeDesc}, ${item.boardTypeDesc}, ${item.statusDesc}`,
          value: item.roomId
        }
        this.roomsList.push(item.roomIdObj)
      })
    },

    setReserveForAmendment () {
      const r = this.reserveDetailsForAmendment
      const value = {
        search: {
          label: `هتل: ${r.hotelName}`,
          value: r.hotelId,
          isHotel: true
        },
        fromDate: r.fromDate,
        toDate: r.toDate,
        dateInText: r.persianFromDateDate,
        dateOutText: r.persianToDateDate,
        hotellId: r.hotelId,
        hotelId: r.hotelId,
        payType: r.payType,
        note: r.note,
        totalPrice: r.totalPrice,
        previousReserveId: r.id,
        reserveDetailList: r.detailReserves.map(item => ({
          providerType: r.providerType,
          providerStr: r.providerTypeDesc,
          halfChargeIn: !(item.halfChargeIn <= 0),
          halfChargeOut: !(item.halfChargeOut <= 0),
          chargeIn: !(item.halfChargeIn <= 0),
          chargeOut: !(item.halfChargeOut <= 0),
          numberOfExtraBed: item.numberOfExtraBed,
          numberOfGuest: item.numberOfChild,
          roomId: item.roomId,
          boardType: item.boardType,
          hourType: item.hourType,
          isWarranty: item.isWarranty,
          hotelChildIds: item.reserveChilds.map(i => i.childId),
          // serviceIds: [],
          // restCheckIn: "14:00",
          sumPriceAmountDisc: item.boardPriceWithDisscount,
          sumBedPriceAmountDisc: item.boardExtraBedPriceWithDisscount,
          extraCapacity: item.numberOfExtraBed,
          mainCapacity: item.numberOfGuest,
          childCapacity: item.numberOfChild,
          roomReserveType: 1,
          roomName: item.roomName,
          // "qty": 4,
          // "minPerson": 0,
          boardTypeDesc: item.boardTypeDesc,
          childrenNumbers: item.reserveChilds.length,
          // "totalPriceChild": 0,
          totalPrice: item.totalPrice,
          halfChargeInDisc: item.halfChargeIn || '0',
          halfChargeOutDisc: item.halfChargeOut || '0',
          boardReserveTypePrices: item.dailyDetailReserve,
          /*  "childrenPoliciesInstance": [
              {
                  "label": "حداقل سن: 6 حداکثر سن: 5 تخت ندارد: 0%",
                  "value": {
                      "id": 145,
                      "minAge": 6,
                      "maxAge": 5,
                      "percent": 0,
                      "hasBed": false
                  }
              }
          ], */
          totalPriceDisc: item.totalPrice,
          guestList: this.setChildObject(item.guests),
          totalPriceChild: item.reserveChilds.reduce((n, { priceWithbed, priceWithoutbed, isbed }) => n + (isbed ? priceWithbed : priceWithoutbed), 0)
          /* "services": [
              {
                  "serviceId": 11,
                  "serviceName": "استخر",
                  "servicePrice": 40000000,
                  "isActive": false
              },
              {
                  "serviceId": 12,
                  "serviceName": "تالار",
                  "servicePrice": 10400000,
                  "isActive": false
              },
              {
                  "serviceId": 2020,
                  "serviceName": "همایش",
                  "servicePrice": 104200000,
                  "isActive": false
              }
          ],
          "servicesText": [] */
        }))
      }

      localStorage.setItem('modificationReserves', JSON.stringify(value))
      window.location.href = `#/${this.panel}/search2?search=${value.search.label}&id=${value.search.value}&dateIn=${value.fromDate}&dateOut=${value.toDate}`
    },

    setChildObject (guests) {
      const g = guests
      g.forEach(item => {
        item.genderObj = {
          label: 'آقا',
          value: 1
        }
      })
      return g
    },

    updatePrice (item) {
      this.reserveDetailsForEdit[item] = makeTripple.numberWithOutCommas(this.reserveDetailsForEdit[item])
      this.reserveDetailsForEdit[item] = makeTripple.numberWithCommas(this.reserveDetailsForEdit[item])
      // console.log(this.reserveDetailsForEdit[item])
    },
    // async doAutoSeen () {
    //   if (!this.reserveDetails.isSeen) {
    //     this.accepted = true
    //     this.disableIsSeen = true

    //     await api.post('ReserveService/SeenReserve', { reserveId: this.reserveDetails.id, seen: true })
    //       .then(async response => {
    //         this.reserveDetails.isSeen = true
    //         await api.get(`ReserveService/GetReserveDetails/${this.$route.params.reserveId}`).then(response => {
    //           this.reserveDetails = response.data
    //         })
    //         this.reserveDetails.reserveHistories.forEach((item, i) => {
    //           item.index = i + 1
    //         })
    //         this.disableIsSeen = false
    //       }).catch(er => {
    //         this.disableIsSeen = false
    //       })
    //   }
    // },

    getRoomsForCancelation () {
      this.reserveDetails.detailReserves.forEach(item => {
        if (item.status !== 3) {
          this.totalCanceledRooms.push({
            label: item.roomName + ` (${item.id})`,
            value: item.id
          })
        }
      })
    },

    getFinantilInfo () {
      this.finantialDetails = []
      for (const row of this.reserveDetails.detailReserves) {
        const item = row.dailyDetailReserve
        for (let i = 0; i < item.length; i++) {
          item[i].status = row.status
          item[i].id = i
          item[i].roomId = row.id
          item[i].numberOfExtraBed = row.numberOfExtraBed
          item[i].roomName = row.roomName
          item[i].masterGuest = row.guests.filter(guest => guest.isMaster)
          item[i].note = row.note
          item[i].childNoBeds = row.childNoBeds
          item[i].childWithBeds = row.childWithBeds
          // item[i].childNoBed = row[i].childNoBed
          // item[i].childWithBed = row[i].childWithBed
          item[i].serviceNames = row.serviceNames
          item[i].totalPrice = row.status === 3 ? row.penaltyAmount : item[i].totalPrice

          if (row.status === 3 && (i === 0 || row.appliedOn === 2)) item[i].class = 'bg-lighten-pink'
          if (i === 0) item[i].halfChargeIn = row.halfChargeIn
          if (i === item.length - 1) item[i].halfChargeOut = row.halfChargeOut
          // console.error(item[i].totalPrice)
        }
        this.finantialDetails.push(...item)
      }
      this.finantialDetails.forEach((item, index) => {
        item.totalPrice = this.splitter(item.totalPrice)
      })

      // this.$refs.finantialDetailsTable.setRowsValue()
      // console.error(this.finantialDetails)
    },

    async getHotelDetails () {
      await api.get(`Hotel/Hotels/${this.reserveDetails.hotelId}`).then(response => {
        this.hotelDetails = {
          stars: response.data.star,
          tel: response.data.tel,
          name: response.data.name,
          id: response.data.id,
          address: response.data.address,
          img: response.data.logo
        }
      })
    },

    async getReserveTickets () {
      await api.get(`/ReserveService/GetReserveTickets?reserveId=${this.reserveDetails.hotelId}`).then(response => {
        this.reserveDetails.tickets = response.data
      })
    },

    async onSeenReserve (seen) {
      this.disableIsSeen = true
      this.loadHistory = false
      await api.post('ReserveService/SeenReserve', {
        reserveId: this.reserveDetails.id,
        seen
      }).then(async response => {
        await this.getReserveDetails()
        this.disableIsSeen = false
      }).catch(er => {
        this.disableIsSeen = false
        this.loadHistory = true
      })
    },

    async getTickets () {
      await api.get(`ReserveService/GetReserveTickets?reserveId=${this.reserveDetails.id}`).then(response => {
        this.tickets = response.data.records
      })
    },

    async confirmPay () {
      await api.post('ReserveService/ConfirmPay', { reserveIds: [this.reserveDetails.id] }).then(response => {
        this.$emit('on-notify', 'با موفقیت انجام شد')
        this.getReserveDetails()
      })
        .catch((error) => {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        })
    },

    onOpenCancelation () {
      this.cancelationDialog = true
    },
    async onSetEstelamCreationByHotel (isValidated) {
      this.reserveDetails.loading = true
      await onSetEstelamCreationByHotel(this.reserveDetails, this.reserveDetailsForSale.reservesDetails, 'id', isValidated)
        .then(res => {
          this.reserveDetails.loading = false
          this.$emit('on-notify', 'با موفقیت ثبت شد')
          this.getReserveDetails()
        })
        .catch((error) => {
          // console.error(error)
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        })
    },

    async onSetEstelamValidation (isValidated) {
      this.reserveDetails.loading = true
      await onSetEstelamValidation(this.reserveDetails, 'id', isValidated)
        .then(res => {
          this.reserveDetails.loading = false
          this.$emit('on-notify', 'با موفقیت ثبت شد')
          this.getReserveDetails()
        }).catch((error) => {
          // console.error(error)
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        })
    },

    async onCancelRooms () {
      this.loader = true
      if (this.canceledRooms.length === 0) {
        this.$emit('on-notify', 'حداقل یک اتاق را انتخاب کنید', 'negative')
        this.$refs.cancelationDialogRef.loading = false
        return
      }
      await api.post('ReserveService/GetPenalty', {
        reserveDetailIds: this.canceledRooms
      }).then(res => {
        this.onSuccessCancelDialog(res)
        this.loader = false
      }).catch(error => {
        if (error.response != null && !this.disableNotify) {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        }
        this.loader = false
      })
    },
    async doNoshow (isNoshow = true) {
      if (this.noShowedRooms.length === 0) {
        this.$emit('on-notify', 'حداقل یک اتاق را انتخاب کنید', 'negative')
        this.$refs.noShowDialogRef.loading = false
        this.$refs.cancelationWithoutPenaltyDialogRef.loading = false
        return
      }
      if (isNoshow) {
        this.$refs.noShowDialogRef.submit({
          url: 'ReserveService/Nosho',
          value: {
            reserveDetailIds: this.noShowedRooms,
            noshoType: this.noshoType,
            withoutPenalty: false
          }
        })
      } else {
        this.$refs.cancelationWithoutPenaltyDialogRef.submit({
          url: 'ReserveService/Nosho',
          value: {
            reserveDetailIds: this.noShowedRooms,
            noshoType: 0,
            withoutPenalty: true
          }
        })
      }
    },

    onSuccessCancelDialog (response) {
      this.cancelRoomDisableNotifies = false
      this.cancelationDialog = false
      this.cancelationFinalDialog = true
      this.getPenalty = response.data
    },
    onSuccessCancelationDialog () {
      this.cancelationFinalDialog = false
      this.getReserveDetails()
    },
    async onFinalCancelation () {
      this.loader = true
      await api.post('ReserveService/CancelByRoom', {
        reserveDetailIds: this.canceledRooms
      }).then(res => {
        this.onSuccessCancelationDialog()
        this.loader = false
      }).catch(error => {
        if (error.response != null && !this.disableNotify) {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        }
        this.loader = false
      })
    },

    getPanel () {

    },

    onSendNewTicket (text, ticket) {
      /*
      // const url = this.instanceModel.fromEntityName === 'ادمین' ? 'Ticket/createTicketMessageMgmt' : 'Ticket/sendTicketMessageMgmt'
      const postObj = {
        url,
        value: {
          responseMessage: text,
          ticketId: ticket.ticketId
        }
      }
      this.$refs.sendTicketDialogRef.submit(postObj) */
    },

    async onSubmitEstelamReserve () {
      await api.post('ReserveService/CreateVHotelReserveByEstelam', this.reserveDetailsForSale).then(response => {
        this.$router.go()
      }).catch(error => {
        if (error.response != null) {
          error.response.data.errorsList.forEach(item => {
            this.$emit('on-notify', item, 'negative')
          })
        }
      })
    },

    onNotify (message, type) {
      this.$emit('on-notify', message, type)
      this.sendTicketDialog = false
    }

  },

  components: {
    ItemsList,
    ExpansionList,
    TableList,
    SendRecieveTicketsPanel,
    CardPanel,
    CreateTicketDialog,
    GuestsDetailsPanel
  }
}

</script>
<style>
@media print {
  /* Landscape layout */
  @page {
    size: landscape;
  }

  /* 70% scale */
  /* html, body {
    transform: scale(.78);
    transform-origin: top left;
  } */
}
</style>
