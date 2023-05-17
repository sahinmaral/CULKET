using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CULKET.Backend.BackgroundWorker
{
    public class MovieCheckBackgroundService : BackgroundService
    {
        readonly ILogger<MovieCheckBackgroundService> _logger;
        const int TWENTY_FOUR_HOURS_MS = 86400000;
        int counter = 0;

        public MovieCheckBackgroundService(ILogger<MovieCheckBackgroundService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                if (counter == TWENTY_FOUR_HOURS_MS)
                {
                    _logger.LogInformation("Checking if any new movie is released");
                    counter = 0;
                }
                else
                {
                    counter += 1000;
                }


                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}