<script>
import moment from "moment";
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: ["game", "rounds"],
  mounted() {
    const colors = [
      "#FF0066",
      "#00FBFF",
      "#FFCC00",
      "#0088FF",
      "#AEFF00",
      "#000000"
    ];
    let colorIndex = 0;

    // get labels
    const rawLabels = {};
    this.rounds.forEach(x => (rawLabels[x.createdAt] = 1));
    const labels = Object.keys(rawLabels);
    labels.sort();

    // get datasets
    const rawPlayers = {};
    this.rounds.forEach(r =>
      r.players.forEach(p => {
        if (!rawPlayers[p.id]) rawPlayers[p.id] = { ...p };
      })
    );
    const players = [];
    Object.keys(rawPlayers).forEach(p => {
      rawPlayers[p].scores = [];
      labels.forEach(date => {
        const round = this.rounds.find(x => x.createdAt === date);
        let score = null;
        const roundPlayer = round.players.find(x => Number(x.id) === Number(p));
        if (roundPlayer) score = roundPlayer.score;
        rawPlayers[p].scores.push(score);
      });
    });

    const datasets = [];
    Object.keys(rawPlayers).forEach(p => {
      const dataset = {
        label: rawPlayers[p].name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: colors[colorIndex++], // The main line color
        borderCapStyle: "square",
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: [],
        spanGaps: true
      };
      rawPlayers[p].scores.forEach(x => dataset.data.push(x));
      datasets.push(dataset);
    });

    this.renderChart(
      {
        labels: labels.map(x => moment(Number(x)).calendar()),
        datasets
      },
      {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    );
  }
};
</script>
