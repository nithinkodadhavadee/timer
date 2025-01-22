<script lang="ts">
    // Array of time intervals, each containing hours, minutes, and seconds
    let timeIntervals: { h: number; m: number; s: number }[] = [{ h: 0, m: 10, s: 0 }];
    let count: number = 1; // Number of repetitions
    let round: number = 1;
    let running: boolean = false; // Is the timer running?
 
    // Current timer display in seconds
    let currentTime: number = 0;
    let timerId: NodeJS.Timeout | undefined;
 
    // Add a new time interval
    function addTimeInterval(): void {
       timeIntervals = [...timeIntervals, { h: 0, m: 0, s: 0 }];
    }
 
    // Convert intervals to cumulative seconds
    function calculateIntervals(intervals: { h: number; m: number; s: number }[]): number[] {
       let cumulativeSeconds = 0;
       return intervals.map(({ h, m, s }) => {
          cumulativeSeconds = h * 3600 + m * 60 + s;
          return cumulativeSeconds;
       });
    }
 
    // Play a beep sound
    function playBeep(): void {
       const audio = new Audio('/duckQuack.mp3');
       audio.play();
       console.log('Beep! Timer completed for this interval.');
    }
 
    // Update the visible countdown timer
    function updateTimerDisplay(totalTime: number): void {
       currentTime = totalTime;
       timerId = setInterval(() => {
          if (currentTime > 0) {
             currentTime -= 1;
          } else {
             clearInterval(timerId);
          }
       }, 1000);
    }
 
    // Start the timer
    async function startTimer(): Promise<void> {
       running = true;
       const totalRounds = count;
       const intervals = calculateIntervals(timeIntervals);
 
       console.log("intervals:\n", intervals);
       for (round = 1; round <= totalRounds; round++) {
          console.log(`Starting round ${round} of ${totalRounds}`);
 
          // Loop through all time intervals and set the cumulative time
          for (const interval of intervals) {
             const beepTime = interval;
             console.log(`Interval: ${interval} seconds, Cumulative beep time: ${beepTime} seconds`);
 
             // Update the countdown timer for this interval
             updateTimerDisplay(round ,beepTime);
 
             // Wait for the cumulative time and play the beep sound
             await new Promise((resolve) => {
                setTimeout(() => {
                   if (running) playBeep();
                   resolve(null);
                }, beepTime * 1000); // Multiply by 1000 to convert seconds to milliseconds
             });
 
          }
       }
 
       running = false;
       console.log('All rounds completed!');
    }
 
    // Stop the timer
    function stopTimer(): void {
       running = false;
       clearInterval(timerId);
       console.log('Timer stopped.');
    }
 </script>
 
 <h1>Custom Timer</h1>
 
 <!-- Display the countdown timer -->
 <div>
    <h2>Rounds: {round-1}</h2><h4>Time Remaining: {Math.floor(currentTime / 3600)}:{Math.floor((currentTime % 3600) / 60)}:{currentTime % 60}</h4>
 </div>
 
 <!-- List of time intervals -->
  <table>
    <tbody>
    <tr>
        <td></td>
        <td>hh</td>
        <td>mm</td>
        <td>ss</td>
    </tr>
 {#each timeIntervals as time, index}
    <tr>
        <td><label>Time Interval {index + 1}: </label></td>
       <td>
        <input type="number" bind:value={time.h} min="0" placeholder="Hours" /> :</td>
       <td>
        <input type="number" bind:value={time.m} min="0" placeholder="Minutes" /> :</td>
       <td>
        <input type="number" bind:value={time.s} min="0" placeholder="Seconds" /></td>
    </tr>
 {/each}
</tbody>
</table>
 
 <!-- Button to add a new time interval -->
 <button on:click={addTimeInterval}>Add Time Interval</button>
 
 <!-- Input for the number of repetitions -->
 <div>
    <label>Count: </label>
    <input type="number" bind:value={count} min="1" />
 </div>
 
 <!-- Timer control buttons -->
 <button on:click={startTimer} disabled={running}>Start Timer</button>
 <button on:click={stopTimer} disabled={!running}>End Timer</button>
 