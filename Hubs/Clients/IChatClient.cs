using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat_Test.Models;

namespace Chat_Test.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task NewClientJoined(int count);
    }
}
