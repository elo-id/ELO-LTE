<template>
  <div>
    <ImageSlider />

    <NavigatorButton
      :current="selectedForm"
      @select-form="selectedForm = $event"
    />

    <AnnouncementNews
      v-if="selectedForm === 'Annoucement News'"
      :all-data="allData"
    />

    <TenderForm
      v-else-if="selectedForm === 'Tender'"
      :all-data="allData"
    />
  </div>
</template>

<script>
import ImageSlider from "@/components/EProcurement/ImageSlider.vue";
import NavigatorButton from "@/components/EProcurement/NavigatorButton.vue";
import AnnouncementNews from "@/components/EProcurement/AnnouncementNews.vue";
import TenderForm from "@/components/EProcurement/TenderForm.vue";

export default {
  components: {
    ImageSlider,
    NavigatorButton,
    AnnouncementNews,
    TenderForm,
  },
  data() {
    return {
      selectedForm: "Annoucement News",
      allData: [],
    };
  },
  async mounted() {
    const response = await fetch("/data/eprocurementdata.json");
    this.allData = await response.json();
  },
};
</script>
